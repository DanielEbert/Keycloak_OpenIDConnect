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
