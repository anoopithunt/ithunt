/* ==========================================================================
   IT HUNT - Online Examination Questions & Student Submissions Repository
   ========================================================================== */

export const EXAM_QUESTION_BANKS = {
  'mern-arch': {
    id: 'mern-arch',
    title: 'Full-Stack Architecture & API Mastery Exam (March 2026)',
    subject: 'MERN Stack & Cloud Systems',
    durationMinutes: 15,
    maxMarks: 100,
    passingMarks: 50,
    questions: [
      {
        id: 1,
        question: 'In React 18, how does the Virtual DOM Reconciliation algorithm optimize DOM updates?',
        options: [
          { key: 'A', text: 'By directly rewriting the entire real DOM tree on every state update.' },
          { key: 'B', text: 'By computing a diff between the previous and current Virtual DOM trees and batching only necessary real DOM mutations.' },
          { key: 'C', text: 'By bypassing the browser JavaScript engine and modifying GPU render layers directly.' },
          { key: 'D', text: 'By converting JSX templates into server-side XML before each user click event.' }
        ],
        correctOption: 'B',
        explanation: 'React uses a heuristic O(n) diffing algorithm comparing the new Virtual DOM with the fiber tree, batching updates to minimize expensive real DOM repaints.'
      },
      {
        id: 2,
        question: 'Which phase of the Node.js Event Loop handles callbacks scheduled by setTimeout() and setInterval()?',
        options: [
          { key: 'A', text: 'Poll phase' },
          { key: 'B', text: 'Check phase (setImmediate)' },
          { key: 'C', text: 'Timers phase' },
          { key: 'D', text: 'Close callbacks phase' }
        ],
        correctOption: 'C',
        explanation: 'The Timers phase executes callbacks scheduled by setTimeout() and setInterval() whose threshold has elapsed.'
      },
      {
        id: 3,
        question: 'Why are Compound Indexes in MongoDB queried according to the "Equality, Sort, Range" (ESR) rule?',
        options: [
          { key: 'A', text: 'To allow MongoDB to narrow the B-Tree search space first by exact equality, order index keys without an in-memory sort, and then scan the range.' },
          { key: 'B', text: 'Because MongoDB does not support sorting on indexed fields unless equality fields are omitted.' },
          { key: 'C', text: 'Because Range operators must always precede Equality operators to prevent query timeout.' },
          { key: 'D', text: 'To encrypt database fields using HMAC-SHA256 before disk writing.' }
        ],
        correctOption: 'A',
        explanation: 'The ESR rule ensures minimum index key examination: exact matches first, indexed ordering for sorting, and range bounds last.'
      },
      {
        id: 4,
        question: 'Where is the cryptographic signature of a JSON Web Token (JWT) verified, and why is JWT stateless?',
        options: [
          { key: 'A', text: 'It is verified on a central OAuth server on every HTTP request.' },
          { key: 'B', text: 'The backend verifies the signature using its secret/public key; no database session lookup is required as the payload contains user claims.' },
          { key: 'C', text: 'It is decrypted inside the client browser LocalStorage without backend involvement.' },
          { key: 'D', text: 'It requires active TCP socket connection to the issuing DNS provider.' }
        ],
        correctOption: 'B',
        explanation: 'JWTs are self-contained. The server verifies integrity using HMAC or RSA signature, eliminating database lookups on every request.'
      },
      {
        id: 5,
        question: 'What is the signature of standard Express.js error-handling middleware?',
        options: [
          { key: 'A', text: 'app.use((req, res, next) => {})' },
          { key: 'B', text: 'app.use((err, req, res, next) => {})' },
          { key: 'C', text: 'app.use((err, res) => {})' },
          { key: 'D', text: 'app.use((status, err, req) => {})' }
        ],
        correctOption: 'B',
        explanation: 'Express recognizes error-handling middleware specifically by having exactly four arguments: (err, req, res, next).'
      },
      {
        id: 6,
        question: 'In Vue 3 / React component architecture, what is the consequence of omitting a key prop in a v-for or map() list rendering?',
        options: [
          { key: 'A', text: 'The component immediately throws a fatal compiler syntax error and crashes the build.' },
          { key: 'B', text: 'The Virtual DOM cannot uniquely identify items across re-renders, causing state bleed between list elements and inefficient DOM patching.' },
          { key: 'C', text: 'CSS styles will not load for any element rendered inside the loop.' },
          { key: 'D', text: 'The backend database will reject incoming queries for that list.' }
        ],
        correctOption: 'B',
        explanation: 'The key attribute provides a stable identity for virtual nodes, allowing the diffing engine to reuse and reorder DOM nodes correctly.'
      },
      {
        id: 7,
        question: 'What is the primary difference between WebSockets and HTTP Long Polling for real-time notifications?',
        options: [
          { key: 'A', text: 'WebSockets establish a single persistent full-duplex TCP connection with low frame overhead, whereas Long Polling continuously opens and closes HTTP request-response cycles.' },
          { key: 'B', text: 'HTTP Long Polling only works over UDP while WebSockets require ICMP.' },
          { key: 'C', text: 'WebSockets can only transfer plain text files smaller than 10KB.' },
          { key: 'D', text: 'HTTP Long Polling is faster because it does not require an initial handshake.' }
        ],
        correctOption: 'A',
        explanation: 'WebSockets upgrade an HTTP connection into a persistent two-way channel, eliminating header overhead on repeated data frames.'
      },
      {
        id: 8,
        question: 'Which HTTP status code should a RESTful API return when a client attempts to create an account with an email that already exists in the database?',
        options: [
          { key: 'A', text: '200 OK' },
          { key: 'B', text: '404 Not Found' },
          { key: 'C', text: '409 Conflict' },
          { key: 'D', text: '502 Bad Gateway' }
        ],
        correctOption: 'C',
        explanation: 'HTTP 409 Conflict indicates the request cannot be completed due to a conflict with the current state of the target resource (such as unique email duplicate).'
      },
      {
        id: 9,
        question: 'In CSS architecture, what is the computed specificity value of a selector such as "#main-nav .menu-item:hover a"?',
        options: [
          { key: 'A', text: '0, 1, 0, 0' },
          { key: 'B', text: '0, 0, 2, 2' },
          { key: 'C', text: '1, 2, 1 (1 ID, 2 Classes/Pseudo-classes, 1 Element)' },
          { key: 'D', text: '2, 0, 1, 0' }
        ],
        correctOption: 'C',
        explanation: '#main-nav (1 ID) + .menu-item (1 class) + :hover (1 pseudo-class) + a (1 element) = Specificity (1, 2, 1).'
      },
      {
        id: 10,
        question: 'How do MongoDB ACID Transactions maintain data integrity across multiple collections?',
        options: [
          { key: 'A', text: 'By executing all writes in parallel without locking and ignoring write conflicts.' },
          { key: 'B', text: 'By utilizing a two-phase commit protocol across replica set members so all operations either commit atomically or abort completely.' },
          { key: 'C', text: 'By converting collections into temporary CSV files on the server hard drive.' },
          { key: 'D', text: 'By requiring clients to manually send rollback SQL queries on network error.' }
        ],
        correctOption: 'B',
        explanation: 'Multi-document transactions in MongoDB ensure Atomicity, Consistency, Isolation, and Durability using replica set sessions.'
      }
    ]
  },

  'frontend-react': {
    id: 'frontend-react',
    title: 'Frontend Engineering & Component State Architecture',
    subject: 'React.js, Vue 3 & Modern UI Architecture',
    durationMinutes: 15,
    maxMarks: 100,
    passingMarks: 50,
    questions: [
      {
        id: 1,
        question: 'What is the purpose of the useMemo hook in React?',
        options: [
          { key: 'A', text: 'To memoize the result of an expensive calculation between re-renders based on specified dependencies.' },
          { key: 'B', text: 'To fetch remote data asynchronously from an API.' },
          { key: 'C', text: 'To force a complete browser page refresh.' },
          { key: 'D', text: 'To store encrypted passwords in session cookies.' }
        ],
        correctOption: 'A',
        explanation: 'useMemo caches the result of a function call and recomputes it only when one of its dependencies changes.'
      },
      {
        id: 2,
        question: 'Which modern CSS property prevents background scrolling when a mobile modal or off-canvas drawer is active?',
        options: [
          { key: 'A', text: 'text-decoration: underline;' },
          { key: 'B', text: 'overscroll-behavior: contain; combined with overflow: hidden on html and body.' },
          { key: 'C', text: 'display: inline;' },
          { key: 'D', text: 'float: left;' }
        ],
        correctOption: 'B',
        explanation: 'overscroll-behavior: contain prevents scroll chaining to the parent viewport, and overflow: hidden locks the root document.'
      },
      {
        id: 3,
        question: 'What will "console.log(typeof null)" return in JavaScript?',
        options: [
          { key: 'A', text: '"null"' },
          { key: 'B', text: '"undefined"' },
          { key: 'C', text: '"object"' },
          { key: 'D', text: '"boolean"' }
        ],
        correctOption: 'C',
        explanation: 'In JavaScript, typeof null returning "object" is a historic legacy bug in the initial JavaScript implementation that remains for backward compatibility.'
      },
      {
        id: 4,
        question: 'In Vue 3 Composition API, what is the difference between ref() and reactive()?',
        options: [
          { key: 'A', text: 'ref() takes any value and exposes it under .value; reactive() only takes objects and returns a deep reactive proxy directly.' },
          { key: 'B', text: 'ref() is only for numbers while reactive() is only for strings.' },
          { key: 'C', text: 'reactive() can only be called once in an entire application.' },
          { key: 'D', text: 'There is no difference; they are exact aliases.' }
        ],
        correctOption: 'A',
        explanation: 'ref() creates a ReactiveReference wrapping primitives or objects with .value, while reactive() directly wraps objects in ES6 Proxies.'
      },
      {
        id: 5,
        question: 'Which lifecycle event in modern web development represents the moment when the HTML document is parsed and DOM tree built without waiting for images/stylesheets?',
        options: [
          { key: 'A', text: 'window.onload' },
          { key: 'B', text: 'DOMContentLoaded' },
          { key: 'C', text: 'beforeunload' },
          { key: 'D', text: 'hashchange' }
        ],
        correctOption: 'B',
        explanation: 'DOMContentLoaded fires when the initial HTML document has been completely parsed without waiting for stylesheets, images, and subframes.'
      },
      {
        id: 6,
        question: 'What is a JavaScript Closure?',
        options: [
          { key: 'A', text: 'A function bundled together with references to its lexical environment, allowing it to remember and access variables from its outer scope.' },
          { key: 'B', text: 'A syntax error that halts script execution.' },
          { key: 'C', text: 'A method for closing browser tabs programmatically.' },
          { key: 'D', text: 'A tool for deleting HTML nodes.' }
        ],
        correctOption: 'A',
        explanation: 'Closures give inner functions access to an outer function’s scope even after the outer function has returned.'
      },
      {
        id: 7,
        question: 'In modern CSS Grid layout, what does the unit "1fr" denote?',
        options: [
          { key: 'A', text: 'One fixed foot.' },
          { key: 'B', text: 'One fraction of the available free space inside the grid container.' },
          { key: 'C', text: 'One frame rate per second.' },
          { key: 'D', text: 'One front-end resource.' }
        ],
        correctOption: 'B',
        explanation: 'The fr unit represents a fraction of the leftover space in the grid container.'
      },
      {
        id: 8,
        question: 'Why does React require state to be treated as immutable rather than mutating object properties directly?',
        options: [
          { key: 'A', text: 'Direct mutation does not change object memory references, causing shallow comparison checks to miss state changes and skip re-renders.' },
          { key: 'B', text: 'JavaScript objects automatically lock themselves in production.' },
          { key: 'C', text: 'Because browsers charge memory fees for mutable objects.' },
          { key: 'D', text: 'To allow Node.js to read the browser heap.' }
        ],
        correctOption: 'A',
        explanation: 'Immutability allows fast reference equality checks (prevProps.item !== nextProps.item) to trigger optimal rendering.'
      },
      {
        id: 9,
        question: 'What is the purpose of the HTML5 `<meta name="viewport" content="width=device-width, initial-scale=1.0">` tag?',
        options: [
          { key: 'A', text: 'To prevent users from right-clicking on website images.' },
          { key: 'B', text: 'To instruct mobile browsers to set screen viewport width to device width and avoid desktop zoomed-out rendering.' },
          { key: 'C', text: 'To force the browser into Dark Mode automatically.' },
          { key: 'D', text: 'To connect to the local Wi-Fi router.' }
        ],
        correctOption: 'B',
        explanation: 'The viewport meta tag establishes the virtual canvas dimensions for responsive CSS media queries on mobile devices.'
      },
      {
        id: 10,
        question: 'Which tool does Vite utilize during development to achieve lightning-fast Hot Module Replacement (HMR)?',
        options: [
          { key: 'A', text: 'Native ES Modules (ESM) over HTTP and esbuild pre-bundling in Go.' },
          { key: 'B', text: 'Compiling all code to WebAssembly before every mouse move.' },
          { key: 'C', text: 'Java Applets.' },
          { key: 'D', text: 'Writing output files directly to CD-ROM.' }
        ],
        correctOption: 'A',
        explanation: 'Vite leverages native browser ESM support, serving source code as requested and pre-bundling dependencies with esbuild.'
      }
    ]
  },

  'backend-db': {
    id: 'backend-db',
    title: 'Node.js, Express & MongoDB Performance Optimization',
    subject: 'Server Architecture & Database Indexing',
    durationMinutes: 15,
    maxMarks: 100,
    passingMarks: 50,
    questions: [
      {
        id: 1,
        question: 'What is the difference between process.nextTick() and setImmediate() in Node.js?',
        options: [
          { key: 'A', text: 'process.nextTick() queues callbacks in the microtask queue executed immediately after the current operation before the event loop continues; setImmediate() runs in the Check phase of the event loop.' },
          { key: 'B', text: 'process.nextTick() waits 1000ms while setImmediate() runs immediately.' },
          { key: 'C', text: 'setImmediate() only works on Windows operating systems.' },
          { key: 'D', text: 'They are identical and interchangeable.' }
        ],
        correctOption: 'A',
        explanation: 'process.nextTick() executes microtasks before returning to the event loop phases, whereas setImmediate() queues callbacks for the Check phase.'
      },
      {
        id: 2,
        question: 'What is the risk of performing synchronous file operations like fs.readFileSync() inside an Express route handler?',
        options: [
          { key: 'A', text: 'It completely blocks the single JavaScript thread, freezing request processing for all connected clients during disk I/O.' },
          { key: 'B', text: 'It causes the browser to close immediately.' },
          { key: 'C', text: 'It automatically formats the server hard disk.' },
          { key: 'D', text: 'It converts JavaScript to Python.' }
        ],
        correctOption: 'A',
        explanation: 'Because Node.js executes JavaScript on a single thread, synchronous I/O blocks the entire event loop from serving any other concurrent client requests.'
      },
      {
        id: 3,
        question: 'How do Node.js Streams prevent Out-of-Memory (OOM) errors when processing gigabyte-sized files?',
        options: [
          { key: 'A', text: 'By buffering small chunks of data sequentially in memory and using backpressure to balance reading and writing speeds.' },
          { key: 'B', text: 'By uploading the files to an external third-party FTP server.' },
          { key: 'C', text: 'By compressing data with 99% loss of quality.' },
          { key: 'D', text: 'By restarting the server after each kilobyte.' }
        ],
        correctOption: 'A',
        explanation: 'Streams process pieces of data chunk-by-chunk without loading the entire payload into RAM, using backpressure to manage consumer flow rate.'
      },
      {
        id: 4,
        question: 'What is the Mongoose .lean() query option used for?',
        options: [
          { key: 'A', text: 'Returns plain high-performance JavaScript objects (POJOs) instead of heavy Mongoose Documents with getters, setters, and change tracking.' },
          { key: 'B', text: 'Deletes records that have missing email fields.' },
          { key: 'C', text: 'Creates automatic foreign key constraints.' },
          { key: 'D', text: 'Converts database numbers to Roman numerals.' }
        ],
        correctOption: 'A',
        explanation: '.lean() bypasses Mongoose Document hydration, significantly reducing CPU overhead and memory allocation for read-only queries.'
      },
      {
        id: 5,
        question: 'Which MongoDB Aggregation Pipeline stage is used to perform SQL-like JOINs across collections?',
        options: [
          { key: 'A', text: '$lookup' },
          { key: 'B', text: '$match' },
          { key: 'C', text: '$project' },
          { key: 'D', text: '$unwind' }
        ],
        correctOption: 'A',
        explanation: '$lookup performs a left outer join to an unsharded collection in the same database to filter in documents from the "joined" collection.'
      },
      {
        id: 6,
        question: 'What is the primary role of bcrypt when storing user passwords?',
        options: [
          { key: 'A', text: 'Applies cryptographic salt and repeated key stretching (cost factor) to produce slow, brute-force-resistant one-way password hashes.' },
          { key: 'B', text: 'Encrypts passwords so administrators can recover and read them in plaintext.' },
          { key: 'C', text: 'Checks if password contains uppercase letters.' },
          { key: 'D', text: 'Sends user passwords via SMS verification.' }
        ],
        correctOption: 'A',
        explanation: 'bcrypt uses salted key derivation with adjustable work factor to defeat rainbow table attacks and GPU-accelerated dictionary attacks.'
      },
      {
        id: 7,
        question: 'What does Cross-Origin Resource Sharing (CORS) header "Access-Control-Allow-Origin" accomplish?',
        options: [
          { key: 'A', text: 'Informs client web browsers whether the requesting frontend origin is permitted to read the server response.' },
          { key: 'B', text: 'Configures server DNS records.' },
          { key: 'C', text: 'Accelerates network bandwidth.' },
          { key: 'D', text: 'Enables automatic dark mode.' }
        ],
        correctOption: 'A',
        explanation: 'CORS is a browser security mechanism that restricts cross-origin HTTP requests unless explicitly whitelisted by server response headers.'
      },
      {
        id: 8,
        question: 'Which HTTP method should be used for idempotent updates where the entire resource representation is replaced?',
        options: [
          { key: 'A', text: 'POST' },
          { key: 'B', text: 'PUT' },
          { key: 'C', text: 'PATCH' },
          { key: 'D', text: 'OPTIONS' }
        ],
        correctOption: 'B',
        explanation: 'PUT replaces the entire target resource with the request payload and is idempotent; PATCH is typically for partial updates.'
      },
      {
        id: 9,
        question: 'Why is SQL / NoSQL Injection prevented by using parameterized queries and Object Document Mappers (ODMs)?',
        options: [
          { key: 'A', text: 'User input is treated strictly as literal data rather than executable query syntax commands.' },
          { key: 'B', text: 'ODMs translate all inputs into uppercase strings.' },
          { key: 'C', text: 'Parameters are stored in cookies instead of database tables.' },
          { key: 'D', text: 'Queries are executed only on Saturdays.' }
        ],
        correctOption: 'A',
        explanation: 'Parameterized queries separate code from data, ensuring untrusted user inputs cannot alter the structure of the database command.'
      },
      {
        id: 10,
        question: 'What is connection pooling in database clients?',
        options: [
          { key: 'A', text: 'Reusing a cache of pre-established database TCP connections rather than opening and closing new connections on every client request.' },
          { key: 'B', text: 'Combining Wi-Fi and Ethernet cables together.' },
          { key: 'C', text: 'Stashing database backups in a swimming pool.' },
          { key: 'D', text: 'Deleting expired cookies.' }
        ],
        correctOption: 'A',
        explanation: 'Connection pooling eliminates the high latency of establishing TLS handshakes and authenticating sockets on every single database transaction.'
      }
    ]
  },

  'nielit-mod': {
    id: 'nielit-mod',
    title: 'NIELIT Practical Project Lab Evaluation',
    subject: 'IT Tools, Web Technologies & Cybersecurity',
    durationMinutes: 15,
    maxMarks: 100,
    passingMarks: 50,
    questions: [
      {
        id: 1,
        question: 'Under NIELIT O/A Level syllabus, what is the default port number used by HTTPS protocol?',
        options: [
          { key: 'A', text: 'Port 80' },
          { key: 'B', text: 'Port 443' },
          { key: 'C', text: 'Port 21' },
          { key: 'D', text: 'Port 25' }
        ],
        correctOption: 'B',
        explanation: 'HTTPS operates over Port 443 with TLS encryption, whereas standard unencrypted HTTP uses Port 80.'
      },
      {
        id: 2,
        question: 'Which data structure follows the Last-In, First-Out (LIFO) principle in Computer Science?',
        options: [
          { key: 'A', text: 'Queue' },
          { key: 'B', text: 'Stack' },
          { key: 'C', text: 'Binary Search Tree' },
          { key: 'D', text: 'Linked List' }
        ],
        correctOption: 'B',
        explanation: 'A Stack enforces LIFO access (e.g. call stack, undo history), whereas a Queue enforces FIFO.'
      },
      {
        id: 3,
        question: 'In Python programming, what is the output of "type([1, 2, 3])"?',
        options: [
          { key: 'A', text: "<class 'tuple'>" },
          { key: 'B', text: "<class 'list'>" },
          { key: 'C', text: "<class 'dict'>" },
          { key: 'D', text: "<class 'set'>" }
        ],
        correctOption: 'B',
        explanation: 'Square brackets define a mutable Python list object.'
      },
      {
        id: 4,
        question: 'What is the role of the primary key in relational database management systems (RDBMS)?',
        options: [
          { key: 'A', text: 'To uniquely identify each record in a database table without duplicate or NULL values.' },
          { key: 'B', text: 'To encrypt table column headers.' },
          { key: 'C', text: 'To format text into bold typography.' },
          { key: 'D', text: 'To delete old records automatically.' }
        ],
        correctOption: 'A',
        explanation: 'A Primary Key uniquely identifies each row in a table and cannot contain NULL values.'
      },
      {
        id: 5,
        question: 'What does IoT stand for in modern IT curricula?',
        options: [
          { key: 'A', text: 'Internet of Things' },
          { key: 'B', text: 'Input of Telecommunication' },
          { key: 'C', text: 'Index of Tables' },
          { key: 'D', text: 'Interface of Terminals' }
        ],
        correctOption: 'A',
        explanation: 'IoT (Internet of Things) refers to the network of physical devices embedded with sensors and connectivity.'
      },
      {
        id: 6,
        question: 'In Web Design, which CSS box model property provides space between the content boundary and the border?',
        options: [
          { key: 'A', text: 'Margin' },
          { key: 'B', text: 'Padding' },
          { key: 'C', text: 'Outline' },
          { key: 'D', text: 'Z-index' }
        ],
        correctOption: 'B',
        explanation: 'Padding is the inner spacing between the element content and its border; margin is external spacing outside the border.'
      },
      {
        id: 7,
        question: 'What is Phishing in Cybersecurity?',
        options: [
          { key: 'A', text: 'A social engineering attack where fraudulent communications lure users into revealing sensitive credentials or financial data.' },
          { key: 'B', text: 'A tool for connecting network cables.' },
          { key: 'C', text: 'An operating system backup protocol.' },
          { key: 'D', text: 'A method of repairing damaged RAM.' }
        ],
        correctOption: 'A',
        explanation: 'Phishing tricks individuals into providing confidential passwords or credit card numbers by masquerading as trusted entities.'
      },
      {
        id: 8,
        question: 'Which command is used in Git to create a new branch and switch to it immediately?',
        options: [
          { key: 'A', text: 'git checkout -b <branch-name>' },
          { key: 'B', text: 'git push --all' },
          { key: 'C', text: 'git commit -m "new"' },
          { key: 'D', text: 'git init' }
        ],
        correctOption: 'A',
        explanation: 'git checkout -b <branch-name> (or git switch -c) creates a new branch and checks it out.'
      },
      {
        id: 9,
        question: 'What is the binary representation of decimal number 13?',
        options: [
          { key: 'A', text: '1101' },
          { key: 'B', text: '1011' },
          { key: 'C', text: '1110' },
          { key: 'D', text: '1001' }
        ],
        correctOption: 'A',
        explanation: '8 + 4 + 0 + 1 = 13, which is 1101 in base 2.'
      },
      {
        id: 10,
        question: 'In official project documentation, what is an Abstract / Executive Summary?',
        options: [
          { key: 'A', text: 'A concise overview outlining the project purpose, methodology, key findings, and practical outcomes.' },
          { key: 'B', text: 'The list of software dependencies in package.json.' },
          { key: 'C', text: 'A receipt of financial transactions.' },
          { key: 'D', text: 'A list of student phone numbers.' }
        ],
        correctOption: 'A',
        explanation: 'An abstract provides a standalone high-level summary of the entire project report for examiners and stakeholders.'
      }
    ]
  }
};

// Default Seeded Student Submissions for Instant Teacher Inspection
export const DEFAULT_EXAM_SUBMISSIONS = [
  {
    submissionId: 'SUB-2026-001',
    examId: 'mern-arch',
    examTitle: 'Full-Stack Architecture & API Mastery Exam (March 2026)',
    studentId: 'ITH-2026-001',
    studentName: 'Anup Kumar Mishra',
    rollNo: 'ITH-2026-001',
    batch: 'Batch A - Full Stack 2026',
    submittedAt: '2026-09-18T10:45:00.000Z',
    score: 90,
    maxMarks: 100,
    percentage: 90,
    passed: true,
    answers: {
      1: { qId: 1, selectedOption: 'B', correctOption: 'B', isCorrect: true },
      2: { qId: 2, selectedOption: 'C', correctOption: 'C', isCorrect: true },
      3: { qId: 3, selectedOption: 'A', correctOption: 'A', isCorrect: true },
      4: { qId: 4, selectedOption: 'B', correctOption: 'B', isCorrect: true },
      5: { qId: 5, selectedOption: 'B', correctOption: 'B', isCorrect: true },
      6: { qId: 6, selectedOption: 'B', correctOption: 'B', isCorrect: true },
      7: { qId: 7, selectedOption: 'A', correctOption: 'A', isCorrect: true },
      8: { qId: 8, selectedOption: 'C', correctOption: 'C', isCorrect: true },
      9: { qId: 9, selectedOption: 'A', correctOption: 'C', isCorrect: false },
      10: { qId: 10, selectedOption: 'B', correctOption: 'B', isCorrect: true }
    }
  },
  {
    submissionId: 'SUB-2026-002',
    examId: 'frontend-react',
    examTitle: 'Frontend Engineering & Component State Architecture',
    studentId: 'ITH-2026-002',
    studentName: 'Priya Sharma',
    rollNo: 'ITH-2026-002',
    batch: 'Batch A - Full Stack 2026',
    submittedAt: '2026-09-19T14:20:00.000Z',
    score: 80,
    maxMarks: 100,
    percentage: 80,
    passed: true,
    answers: {
      1: { qId: 1, selectedOption: 'A', correctOption: 'A', isCorrect: true },
      2: { qId: 2, selectedOption: 'B', correctOption: 'B', isCorrect: true },
      3: { qId: 3, selectedOption: 'A', correctOption: 'C', isCorrect: false },
      4: { qId: 4, selectedOption: 'A', correctOption: 'A', isCorrect: true },
      5: { qId: 5, selectedOption: 'B', correctOption: 'B', isCorrect: true },
      6: { qId: 6, selectedOption: 'A', correctOption: 'A', isCorrect: true },
      7: { qId: 7, selectedOption: 'B', correctOption: 'B', isCorrect: true },
      8: { qId: 8, selectedOption: 'A', correctOption: 'A', isCorrect: true },
      9: { qId: 9, selectedOption: 'D', correctOption: 'B', isCorrect: false },
      10: { qId: 10, selectedOption: 'A', correctOption: 'A', isCorrect: true }
    }
  },
  {
    submissionId: 'SUB-2026-003',
    examId: 'backend-db',
    examTitle: 'Node.js, Express & MongoDB Performance Optimization',
    studentId: 'ITH-2026-003',
    studentName: 'Rahul Verma',
    rollNo: 'ITH-2026-003',
    batch: 'Batch B - Backend Systems',
    submittedAt: '2026-09-20T11:15:00.000Z',
    score: 70,
    maxMarks: 100,
    percentage: 70,
    passed: true,
    answers: {
      1: { qId: 1, selectedOption: 'A', correctOption: 'A', isCorrect: true },
      2: { qId: 2, selectedOption: 'A', correctOption: 'A', isCorrect: true },
      3: { qId: 3, selectedOption: 'A', correctOption: 'A', isCorrect: true },
      4: { qId: 4, selectedOption: 'B', correctOption: 'A', isCorrect: false },
      5: { qId: 5, selectedOption: 'A', correctOption: 'A', isCorrect: true },
      6: { qId: 6, selectedOption: 'A', correctOption: 'A', isCorrect: true },
      7: { qId: 7, selectedOption: 'C', correctOption: 'A', isCorrect: false },
      8: { qId: 8, selectedOption: 'B', correctOption: 'B', isCorrect: true },
      9: { qId: 9, selectedOption: 'B', correctOption: 'A', isCorrect: false },
      10: { qId: 10, selectedOption: 'A', correctOption: 'A', isCorrect: true }
    }
  }
];

const STORAGE_KEY = 'ithunt_exam_submissions';

export function getStoredExamSubmissions() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return [...DEFAULT_EXAM_SUBMISSIONS];
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_EXAM_SUBMISSIONS));
      return [...DEFAULT_EXAM_SUBMISSIONS];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [...DEFAULT_EXAM_SUBMISSIONS];
  } catch (err) {
    console.warn('Error reading exam submissions from storage:', err);
    return [...DEFAULT_EXAM_SUBMISSIONS];
  }
}

export function saveExamSubmission(submission) {
  if (typeof window === 'undefined' || !window.localStorage) {
    return submission;
  }
  try {
    const existing = getStoredExamSubmissions();
    const existingIdx = existing.findIndex(
      s => (s.submissionId && s.submissionId === submission.submissionId) ||
           (s.studentId === submission.studentId && s.examId === submission.examId)
    );
    if (existingIdx !== -1) {
      existing[existingIdx] = submission;
    } else {
      existing.unshift(submission);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    
    // Dispatch custom event for cross-component reactive synchronization
    window.dispatchEvent(new CustomEvent('ithunt_exam_submitted', { detail: submission }));
    return submission;
  } catch (err) {
    console.warn('Error saving exam submission:', err);
    return submission;
  }
}

export function gradeExam(examId, selectedOptionsMap) {
  const bank = EXAM_QUESTION_BANKS[examId];
  if (!bank) return null;

  const answers = {};
  let correctCount = 0;
  const total = bank.questions.length;
  const pointsPerQuestion = bank.maxMarks / total;

  bank.questions.forEach((q) => {
    const selected = selectedOptionsMap[q.id] || null;
    const isCorrect = selected === q.correctOption;
    if (isCorrect) correctCount += 1;

    const selectedObj = q.options.find(o => o.key === selected);
    const correctObj = q.options.find(o => o.key === q.correctOption);

    answers[q.id] = {
      qId: q.id,
      question: q.question,
      selectedOption: selected,
      selectedText: selectedObj ? selectedObj.text : 'Not Attempted',
      correctOption: q.correctOption,
      correctText: correctObj ? correctObj.text : '',
      isCorrect,
      explanation: q.explanation,
      options: q.options
    };
  });

  const score = Math.round(correctCount * pointsPerQuestion);
  const percentage = Math.round((score / bank.maxMarks) * 100);

  return {
    examId,
    examTitle: bank.title,
    score,
    maxMarks: bank.maxMarks,
    percentage,
    correctCount,
    totalQuestions: total,
    passed: score >= bank.passingMarks,
    answers
  };
}
