export const kill9 = {
  name: 'Kill9',
  title: 'Kill9 for macOS — Find & Kill Processes Using Local Ports',
  description: 'Find and stop processes using local TCP ports on macOS. Kill9 by Aditya Mali identifies development projects and helps resolve port conflicts and EADDRINUSE.',
  summary: 'Kill9 is a native macOS menu bar utility by Aditya Mali, built with SwiftUI and AppKit. It finds processes listening on local TCP ports, identifies associated development projects, and lets you stop those processes through a graphical interface.',
  url: 'https://www.adityamali.com/cafe/kill9',
  developerUrl: 'https://www.adityamali.com',
  sourceUrl: 'https://github.com/adityamali/kill9',
  operatingSystem: 'macOS 13.0 or later',
  features: [
    'Inspect local TCP listeners from the macOS menu bar.',
    'Discover development servers on standard and custom TCP ports.',
    'Identify projects using package.json names or project folders when available.',
    'Stop a selected process with SIGTERM; choose Force if it remains unresponsive.',
    'Customize discovery with port inclusion and exclusion filters.',
  ],
} as const;

export const kill9Faqs = [
  {
    id: 'kill-port-3000',
    question: 'How do I kill a process running on port 3000 on macOS?',
    answer: 'In Terminal, run lsof -nP -iTCP:3000 -sTCP:LISTEN to find the listening process and its PID. Check that it is the server you intend to stop, then run kill -TERM <PID>, replacing <PID> with the actual process ID. Check the port again. Use kill -KILL <PID> only if the same process remains unresponsive and you accept that it cannot clean up. In Kill9, open the menu bar panel, find port 3000, check the project and process, and click Stop. If the process remains, you can choose Force.',
  },
  {
    id: 'find-process',
    question: 'How do I find which process is using a port?',
    answer: 'Run lsof -nP -iTCP:8080 -sTCP:LISTEN to find which process is listening on TCP port 8080. Replace 8080 with your port number. The output includes the command and PID; -nP keeps addresses and ports numeric. Kill9 lists detected development listeners with their port, process, and available project information. Its default discovery focuses on development servers owned by your user, rather than every application or system service.',
  },
  {
    id: 'eaddrinuse',
    question: 'What does EADDRINUSE mean?',
    answer: 'EADDRINUSE means an application could not bind to a requested address and port because it is already in use. For example, a server starting on localhost port 3000 can conflict with another running server. It does not necessarily mean the existing process is hung. Inspect the listener, then stop it if appropriate or configure your new server to use a different port. Kill9 helps identify and stop a conflicting local development process on macOS.',
  },
  {
    id: 'free-localhost-port',
    question: 'How can I free an occupied localhost port?',
    answer: 'If you still have the server’s Terminal session, try Control-C there first. Otherwise, inspect the TCP listener with lsof -nP -iTCP:3000 -sTCP:LISTEN and stop the verified PID with kill -TERM <PID>. Kill9 provides the same inspect-and-stop workflow in its menu bar panel. Stopping a process affects every port it owns. If a supervisor restarts it, stop or reconfigure the supervisor; if you need to keep the service running, choose a different port for your new server.',
  },
  {
    id: 'gui-alternative',
    question: 'Is there a graphical alternative to lsof and kill?',
    answer: 'Yes. Kill9 is a macOS developer utility that combines local TCP listener discovery, project identification, and process termination in a menu bar interface. It uses lsof for listener inspection and macOS process signals for stopping processes, so you can use the interface without typing commands. Terminal remains useful for scripting and inspecting services outside Kill9’s development-server discovery.',
  },
  {
    id: 'identify-project',
    question: 'Can I identify which development project is occupying a port?',
    answer: 'Kill9 inspects the process working directory and nearby project metadata. It shows a package.json name when available, or a project folder name when it can infer one. This helps distinguish several servers that all appear as node or python in a process list. Detection depends on accessible process and project information; an unidentified listener may retain its runtime name. In Terminal, lsof -a -p <PID> -d cwd can help you inspect the working directory of a verified process.',
  },
  {
    id: 'termination',
    question: 'How does Kill9 terminate processes?',
    answer: 'Stop sends SIGTERM to the selected process, giving it an opportunity to shut down. If that same process is still listening after the refresh, Force becomes available. Force sends SIGKILL only when you click it; escalation is not automatic. Kill9 checks the process owner and start time before signaling and does not stop processes owned by other users. Stopping a process closes all ports it owns, and forced termination does not allow cleanup.',
  },
  {
    id: 'windows-linux',
    question: 'Is Kill9 available for Windows or Linux?',
    answer: 'Kill9 is a native macOS application built with SwiftUI and AppKit. The current download requires macOS 13.0 or later and supports Apple silicon and Intel Macs. Kill9 is not available for Windows or Linux. The Terminal commands on this page describe the macOS workflow; commands and available tools differ on other operating systems.',
  },
] as const;
