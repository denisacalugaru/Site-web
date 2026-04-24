ScaiGarden - Sistem Integrat de Gestiune și Prezentare Florărie Online
Proiectul ScaiGarden reprezintă o soluție web completă, construită de la zero, care combină prezentarea estetică a produselor botanice cu funcționalități complexe de afișare a datelor. Accentul este pus pe modularitate, optimizarea performanței CSS și o experiență utilizator (UX) fluidă pe orice terminal.

Detalii de Implementare Tehnică
1. Arhitectura de Layout și Responsivitate
Sistemul utilizează o metodologie de design modernă, eliminând dependența de framework-uri externe (precum Bootstrap), oferind astfel un control total asupra performanței:

Grid Area Layout: Pagina principală utilizează un sistem de grid-template-areas complex, care rearanjează secțiunile (Prezentare, Tabel, Calendar, Anunțuri, Statistici, Server) în configurații diferite pentru desktop (4 coloane), tabletă (2 coloane) și mobil (1 coloană).

Sistem de Unități Dinamice: Implementarea variabilelor CSS (:root) permite controlul centralizat al spațierii (--page-spacing-large), culorilor și pragurilor de responsivitate.

Adaptabilitate Font-Size: Utilizarea unităților relative și ajustarea font-size-ului pe elementul html prin media queries pentru a asigura lizibilitatea textului pe orice rezoluție.

2. Galeria de Produse și Gestiunea Media
Proiectul include două tipuri de galerii (grid dinamic și galerie statică) cu funcționalități avansate:

Randare Inteligentă: Utilizarea repeat(auto-fit, minmax(250px, 1fr)) permite galeriei să decidă singură numărul optim de coloane fără a rupe layout-ul.

Controlul Aspectului: Implementarea proprietății object-fit: cover combinată cu aspect-ratio: 1/1 sau 4/3 garantează că imaginile nu apar deformate, indiferent de dimensiunea lor originală.

Feedback Vizual: Efecte complexe de tip filter: brightness() și tranziții de 1.2 secunde care oferă un aspect premium la interacțiunea cu utilizatorul.

Multimedia: Integrare de elemente <video> cu aspect-ratio controlat și iframe-uri YouTube optimizate pentru vizualizare mobilă.

3. Vizualizarea Datelor și Tabele Responsive
Gestiune Tabelară: Tabelul implementează o structură semantică riguroasă (thead, tbody, tfoot, caption).

Tehnica Horizontal Scroll: Pentru a evita comprimarea celulelor pe mobil, s-a implementat un container cu overflow-x: auto, păstrând integritatea datelor prin white-space: nowrap.

Stilizare Contextuală: Utilizarea pseudo-claselor :nth-child și efecte de hover la nivel de celulă și rând pentru o navigare facilă prin seturile de date.

4. Componente UI Personalizate și Efecte CSS Avansate
Proiectul include elemente grafice realizate pur prin cod CSS:

Buton Back-To-Top: Realizat prin transformări geometrice (rotate(-45deg)) și pseudo-elemente, poziționat fix în viewport.

Efecte de Reflexie: Utilizarea atributelor data-reflection-text și a transformărilor skew, rotateX și scaleY pentru a crea reflexii de text realiste.

Efecte Duotone: Aplicarea modurilor de amestecare (mix-blend-mode: multiply/screen) pe pseudo-elemente pentru a crea filtre de culoare dinamice pe imagini.

Meniuri Semantice: Navigare dropdown construită pe baza elementelor HTML5 <details> și <summary>, asigurând funcționalitate fără JavaScript.

5. Integrare Științifică și Formule
MathML: Proiectul include suport pentru redarea ecuațiilor și simbolurilor matematice în secțiunile de statistici, utilizând tag-uri precum <math>, <mi>, <mn> și <mo>, stilizate pentru a se potrivi cu tema vizuală a site-ului.

Tehnologii și Standarde
HTML5 & CSS3: Respectarea standardelor W3C pentru accesibilitate și SEO.

Variable Scope: Utilizarea variabilelor globale pentru temă (Primary, Secondary, Tertiary Colors).

Pseudo-elemente: Utilizare extensivă a ::before și ::after pentru iconițe și elemente decorative (ex: săgeata pentru link-uri externe).

Organizarea Fișierelor
/index.html - Hub-ul central de gestiune.

/galerie_statica.html - Catalogul vizual de produse.

/css/general.css - Nucleul de stilizare și definițiile de responsivitate.

/media/ - Directorul de resurse grafice și video.
