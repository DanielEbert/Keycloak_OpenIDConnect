# sichere_webanwendungen

Thema: "Frontend Fuzzing"

Testideen: 
- Reines Frontend: statisches HTML mit jQuery - Fuzzing nach Alerts(XSS), nach Hartkodierten Passwörtern, nach Chrome Error-Meldungen
- Frontend-Backend-DB (optional): flask, React, Postgres - Suche nach Backenderror

Idee: PyPuppeteer Frotend-Tests mit Fuzzing Code anreichern

PyPuppeteer steuert Chrome im headless Mode.

Mögliche wissenschaftliche Arbeiten:
- Discovering Vulnerabilities in COTS IoT Devices through Blackbox Fuzzing Web Management Interface https://www.hindawi.com/journals/scn/2019/5076324/
- https://github.com/diiq/frontend-fuzzer
- EWVHunter: Grey-Box Fuzzing with Knowledge Guide on Embedded Web Front-Ends https://www.mdpi.com/2076-3417/10/11/4015

### Motivation

Ein Beispiel was wir schreiben könnten warum Frontend Fuzzing wichtig ist: 'Bei klassischen Webanwendungen berechnet und liefert der Server ein HTML-Dokument aus. Seit einigen Jahren gibt es einen Trend weg von Serverlastiger Code-Ausführung hin zu Clientlastiger Code-Ausführung. *irgendwas mit bugs sind schlecht; sicherheit ist wichtig; Wenn Website nicht funktioniert ist es schlecht;...* Aus diesem Grund müssen Fehler im Frontend schnell und effizient aufgedeckt werden. Fuzzer können eingesetzt werden, um diese Fehler zu finden. ...'

# Überlegungen Sebastian

Begründung für Frontend muss sitzen, bin bei der Suche nach Begründungen auf die Themen <b>Browser- und DOM-Fuzzing</b> gestoßen. Der DOM gehört klar zu Web Apps, ein Browser nur bedingt - jedoch beschäftigen sich die meisten Browser Fuzzer mit der DOM-Manipulation, was clientseitige Angriffsszenarien ermöglicht. Zum Beispiel könnte eine DOM-Manipulation zu einer Memory Corruption führen. Durch Frontend / DOM / HTML Fuzzing könnte man solche clientseitige Angriffsszenarien aufdecken. Problem das Browser-Fuzzing sucht Fehler im Browser, die durch eine Web App ausgelöst werden und nicht in der Web App, nutzt nur den DOM für die Testcases - eventuell könnte man da was ableiten. 

- Browser Fuzzing DOM Level 1-3: https://deepsec.net/docs/Slides/2012/DeepSec_2012_Rosario_Valotta_-_Taking_Browsers_Fuzzing_to_the_next_(DOM)_Level.pdf
- Crossfuzz von Google mit Auswertung: https://browser-security.x41-dsec.de/X41-Browser-Security-White-Paper.pdf
- Fuzzing Browser / DOM / JavaScript engines. Domato: https://github.com/googleprojectzero/domato

Zu <b>DOM-Fuzzing</b> kopiert von https://www.youtube.com/watch?v=kedmtrIEW1k - hat erstmal nix mit fuzzing zu tun - eventuell könnte man die DOM Elemente durch Fuzzing anreichern und Schwachstellen aufdecken. Also sowas wie DOM Injection durch Fuzzing.
Folien zum Vortrag: https://www.blackhat.com/docs/us-15/materials/us-15-Nafeez-Dom-Flow-Untangling-The-DOM-For-More-Easy-Juicy-Bugs.pdf

Modern day web applications are quite JavaScript heavy and its only going to get worse for pen-testers and scanners alike, because of the complexity involved. Client side attacks like DOM XSS, insecure usage of WebSockets, unwanted use of Global variables, insecure user-defined functions, and many other similar patterns are quite hard to detect for the pen-tester manually or even by static JavaScript analysers.
How about we hook onto all the JavaScript actions dynamically and transparently? The results are very useful to conduct more advanced penetration tests on web apps. Existing JS dynamic analysis tools only work if its built within the code, such as performance analysis. Moreover, the JS files are minified in production. To solve this problem enter Hookish!
Hookish! is an open-source chrome-extension which overrides most of the DOM properties and brings out the interesting stuff to the pen-tester. For instance, imagine a single page web-app with some complex JS code and you would like to know whether all the content being dynamically updated to the DOM are clean. Do they use a safe filter / encoder before pushing it to the DOM? Well, Hookish! can solve this problem for you. It hooks into all XHR responses, and matches those strings with DOM mutation events like DOMNodeInserted, DOMSubtreeModified etc. and also tries relevant payloads to check whether there are possible DOM XSS vulnerabilities and other such shenanigans. This is just scratching the surface, things can become more intuitive when a pen-tester uses Dom Flow.
Dom Flow is a feature where one can drag and drop the sources and sinks as he wishes to understand how data flows between them in the given app. This is something which brings out more understanding of the app and reveals hidden DOM based bugs and also helps the pen-tester to conduct further attacks.


Kopiert von https://firefox-source-docs.mozilla.org/tools/fuzzing/index.html#random-ui-interaction
A third way to test programs and in particular user interfaces is by directly interacting with the <b>UI in a random way</b>, typically in combination with other actions the program has to perform. Imagine for example an automated browser that surfs through the web and randomly performs actions such as scrolling, zooming and clicking links. The nice thing about this approach is that you likely find many issues that the end-user also experiences. However, this approach typically suffers from bad reproducibility (see also Reproducibility) and is therefore often of limited use. An example for a fuzzing tool using this technique is Android Monkey. At Mozilla however, we currently don’t make much use of this approach.

Kommentar zum MVP - sieht geschmeidig aus! Wenn ich es richtig verstehe, willst du den Schwerpunkt auf DOM based XSS legen ( Beispiel wäre https://github.com/rverton/xssmap , DOMinator Tool , DOM Snitch) Arbeit: https://people.cispa.io/ben.stock/papers/lekies2013flows.pdf

Jedoch bleibt die Frage bestehen - Was sind die Folgen von DOM XSS, ich denke hartkodierte Passwörter reichen nicht.





