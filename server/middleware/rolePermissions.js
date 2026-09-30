import { SystemSetting } from '../models/SystemSetting.js';

const ROLE_PERMISSION_SETTING_KEY = 'role-permissions';

const sectionForPath = (path) => {
    if (path.startsWith('/admin/role-permissions')) return null;
    if (path === '/admin/stats') return 'overview';
    if (path.startsWith('/admin/users') || path.startsWith('/auth/users')) return 'users';
    if (path === '/auth/login' || path === '/auth/me') return null;
    if (path === '/students/profile') return null;
    if (path.startsWith('/admissions')) return 'admissions';
    if (path.startsWith('/students')) return 'students';
    if (path.startsWith('/nielit-projects') || path.startsWith('/nielit')) return 'nielit';
    if (path.startsWith('/courses')) return 'courses';
    if (path.startsWith('/internships')) return 'internships';
    if (path.startsWith('/events')) return 'events';
    if (path.startsWith('/careers')) return 'careers';
    if (path.startsWith('/reviews')) return 'reviews';
    if (path.startsWith('/fees')) return 'fees';
    if (path.startsWith('/certificates')) return 'certificates';
    if (path.startsWith('/projects')) return 'projects';
    if (path.startsWith('/contact')) return 'contact';
    return null;
};

const isPublicRoute = (method, path) => {
    if (method === 'GET' && (
        path === '/courses' || path === '/events' || path === '/reviews' ||
        path === '/projects' || path.startsWith('/certificates/verify/') ||
        path === '/careers' || path === '/health'
    )) return true;

    return method === 'POST' && (
        path === '/admissions' || path === '/contact' || path === '/reviews' ||
        path === '/projects/submit' || path === '/events/rsvp' ||
        path === '/students/register' || path.startsWith('/careers/applications') ||
        path.startsWith('/internships/applications') || path.startsWith('/nielit/submit') ||
        path.startsWith('/nielit-projects/submit')
    );
};

export async function enforceRoleSectionPermission(req, res, next) {
    const role = String(req.user?.roleType || req.user?.role || '').toLowerCase();
    if (!role || role === 'admin' || role === 'superadmin') return next();

    const section = sectionForPath(req.path);
    if (!section || isPublicRoute(req.method, req.path)) return next();

    try {
        const setting = await SystemSetting.findOne({ key: ROLE_PERMISSION_SETTING_KEY }).lean();
        const access = setting?.value?.[role]?.[section];
        const permission = req.method === 'GET' || req.method === 'HEAD' ? 'view' : 'edit';
        if (access?.[permission] === true) return next();

        return res.status(403).json({
            success: false,
            message: `Your ${role} role does not have ${permission} access to ${section}.`
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Could not verify role permissions.' });
    }
}