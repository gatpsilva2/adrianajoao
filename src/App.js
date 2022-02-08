import './App.css';
import {useState} from "react";
import {
    Routes,
    Route, NavLink, useLocation
} from "react-router-dom";
import {isMobile} from 'react-device-detect';

const randomPosition = () => Math.random() * 80;

function shufflePos(p) {
    if (p.length === 0)
        return [];
    else if (p.length === 1)
        return [{...p[0], top: randomPosition(), left: randomPosition()}];
    else {
        const [h, ...t] = p;
        const st = shufflePos(t);
        return genPos(randomPosition(), randomPosition(), h, st);
    }
}

function genPos(rtop, rleft, h, st) {
    if (st.map(tp => Math.sqrt(((tp.top - rtop) ** 2 + (tp.left - rleft) ** 2))).every(d => d > 10))
        return [{...h, top: rtop, left: rleft}, ...st];
    else
        return genPos(randomPosition(), randomPosition(), h, st);
}


function App() {
    const projects = shufflePos([
        {
            title: "every grain of sand in the world, between 0 and 1",
            url: "every_grain_of_sand",
            year: "2021",
            image: "../everygrain.jpg",
            about_en: {
                media: "Vídeo HD, cor, 07’45’’, loop",
                synopsis: "",
                remarks: "for Alcazar",
                published: null,
                description: "selected pages from the contribution every grain of sand in the world, between 0 and 1 to Alcazar project, soon to be published <br/> 50 pages",
            },
            color: "blue",
            top: 0,
            left: 0,
        },
        {
            title: "venus flytrap",
            url: "venus_flytrap",
            year: "2020",
            image: "../venusflytrap.jpg",
            about_en: {
                media: "Vídeo HD, cor, 07’45’’, loop",
                synopsis: null,
                remarks: null,
                published: null,
                description: null
            },
            color: "yellow",
            top: 0,
            left: 0
        },
        {
            title: "Inversão",
            url: "inversao",
            year: "2019",
            image: "../inversao.jpg",
            about_en: {
                media_en: "HD video, color, sound, 06'42''",
                synopsis: null,
                remarks: null,
                published: null,
                description: null,
            },
            color: "white",
            top: 0,
            left: 0
        },
        {
            title: "swan bones",
            url: "swan_bones",
            year: "2020",
            image: "../swanbones.jpg",
            about_en: {
                media: "HD video, color, stereo sound, 08'28''",
                synopsis: null,
                remarks: "for <a href='https://dose.pt/#dose5'>dose 05</a>",
                published: null,
                description: null,
            },
            color: "green",
            top: 0,
            left: 0
        },
        {
            title: "Untitled (burial)",
            url: "untitled_(burial)",
            year: "2019",
            image: "../untitledburial.jpg",
            about_en: {
                media: "HD video, color, 08'49'', loop",
                synopsis: "The artist is buried in salt by a saline worker.",
                remarks: null,
                published: "In the collective exhibition RÉSVÉS – Castro Marim/Odeleite, at <a href='http://www.belasartes.ulisboa.pt/resves-castro-marim/'>Casa do Sal</a>",
                description: null
            },
            color: "red",
            top: 0,
            left: 0
        },
        {
            title: "I want to see but there is something in (front of) my eyes",
            url: "i_want_to_see",
            year: "2019",
            image: "../iwanttosee.jpg",
            about_en: {
                media: "HD video, color, sound, 14'11'', loop",
                synopsis: "The artist intervenes in a construction site, 7 meters below ground level, prolonging the civil foundation grid \"lines\", previously there, alternately using charcoal and spray paint, giving continuity to the actions of others. Meanwhile, several other actions are perpetuated, in an aparent arbitrary way.\n",
                remarks: "for <a href='https://dose.pt/#dose5'>dose 05</a>",
                published: "Exhibited at Faculdade de Belas-Artes da Universidade de Lisboa",
                description: "As três peças - I want to see but there is something in (front of) my eyes, Untitled (follow me back), Untitled - são apresentadas enquanto instalação, dispostas em três ecrãs, que se aglomeram e se correlacionam num espaço comum, onde o espetador opta por escolher o que vê e o que acaba por não ver. Os três vídeos disponibilizam-se em repetição (loop), numa sala iluminada apenas pela luz dos ecrãs e preenchida pelo som proveniente do vídeo I want to see but there is something in (front of) my eyes.",
            },
            color: "cyan",
            top: 0,
            left: 0
        }
    ]);
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Index projects={projects}/>}/>
                <Route path="projects" element={<Projects projects={projects}/>}/>
                {projects.map(p => <Route key={p.url} path={`projects/${p.url}`} element={<Project project={p}/>}/>)}
                <Route path="about" element={<About/>}/>
            </Routes>
            <nav>
                <div id="projects-navlink-ctn" className="navlink-ctn scaled inverted">
                    <NavLink
                        className="navlink"
                        to="/projects"
                        style={({isActive}) => ({textDecoration: isActive ? "underline" : "none"})}
                    >
                        PROJECTS
                    </NavLink>
                </div>
                <div id="about-navlink-ctn" className="navlink-ctn scaled inverted">
                    <NavLink
                        className="navlink"
                        to="/about"
                        style={({isActive}) => ({textDecoration: isActive ? "underline" : "none"})}
                    >
                        ABOUT
                    </NavLink>
                </div>
            </nav>
            <NavLink
                id="name"
                className={"scaled inverted " + (useLocation().pathname === "/" ? "name-center" :
                    (isMobile ? "name-bottom-center" : "name-corner"))}
                to="/"
            >
                ADRIANA JOÃO
            </NavLink>
        </div>
    );
}

function Index(props) {
    const [previewSrc, setPreviewSrc] = useState("data:,")
    const [previewAlt, setPreviewAlt] = useState("")
    return (
        <main>
            {props.projects.map(p =>
                <div className="project-floating scaled inverted"
                     style={{top: p.top + "%", left: p.left + "%"}}
                     onMouseEnter={() => {
                         setPreviewSrc(p.image);
                         setPreviewAlt(p.title);
                     }}
                     onMouseLeave={() => {
                         setPreviewSrc("data:,");
                         setPreviewAlt("");
                     }}
                >
                    {p.title}
                </div>)
            }
            <img
                src={previewSrc}
                alt={previewAlt}
                id="preview"
                className="preview-fixed"
            />
        </main>
    );
}

function Projects(props) {
    const [previewSrc, setPreviewSrc] = useState("data:,")
    const [previewAlt, setPreviewAlt] = useState("")
    return (
        <main>
            {isMobile ?
                <div>
                    {props.projects.map(p =>
                        <NavLink to={`/projects/${p.url}`} className="navlink">
                            <div id="project-title-mobile" className="scaled inverted">{p.title} ({p.year})</div>
                            <img id="project-thumbnail-mobile" src={"../"+p.image} alt={p.title} width="100%"/>
                        </NavLink>)}
                </div>:
                <table id="projects">
                    <tbody>
                    {props.projects.map(p =>
                            <tr
                                className="scaled inverted project-row"
                                onMouseEnter={() => {
                                    setPreviewSrc(p.image);
                                    setPreviewAlt(p.title);
                                }}
                                onMouseLeave={() => {
                                    setPreviewSrc("data:,");
                                    setPreviewAlt("")
                                }}
                            >
                                <td><NavLink to={`/projects/${p.url}`} className="navlink">{p.title}</NavLink></td>
                                <td>{p.year}</td>
                            </tr>)}
                    </tbody>
                </table>}
            <img
                src={previewSrc}
                alt={previewAlt}
                id="preview"
                className="preview-fixed"
            />
        </main>
    );
}

function Project(props) {
    function setMainHeight({target:img}) {
        document.getElementById("project-text").style.minHeight = 3*img.offsetHeight+"px";
    }
    return (
        <main>
            <div id="project-text" style={{minHeight: 50*3+"vh"}}>
                <p id="project-title" className="scaled inverted">{props.project.title}<br/>{props.project.year}</p>
                <p dangerouslySetInnerHTML={{__html: props.project.about_en.media}}/>
                <p dangerouslySetInnerHTML={{__html: props.project.about_en.synopsis}}/>
                <div id="project-gallery">
                    {/*<ImageGallery
                        showPlayButton={false}
                        autoplay={false}
                        items={[{original: "../"+props.project.image},{original: "../"+props.project.image},{original: "../"+props.project.image}]}
                    />*/}
                    <img src={"../"+props.project.image} alt={props.project.title} width="100%" onLoad={setMainHeight}/>
                    <img src={"../"+props.project.image} alt={props.project.title} width="100%"/>
                    <img src={"../"+props.project.image} alt={props.project.title} width="100%"/>

                </div>
                <p dangerouslySetInnerHTML={{__html: props.project.about_en.published}}/>
                <p dangerouslySetInnerHTML={{__html: props.project.about_en.description}}/>
            </div>
        </main>
    );
}

function About() {
    return (
        <main>
            <div id="about-text">
                <p className="scaled title">CV</p>
                <p>
                    Adriana João<br/>
                    1998, Portugal<br/>
                    Based between Lisbon and Porto, Portugal<br/>
                    adrianarjoao@gmail.com
                </p>
                <p>
                    Graduated in Multimedia Art: Performance and Installation and post-graduated in Sound Art in Faculty of Fine Arts of the University of Lisbon, Portugal, is presently doing the 2nd year of the Masters in Multimedia Art: Moving Image at the same college.
                </p>
                <p>
                    Her transmedia work - sound, moving image, performance, sculpture, photography, installation - is intuitive, procedural, normally exploring her body and the space that the body inhabits, the individual and the collective. Dissecting the controlled chaos and evoking concepts like limit, repetition, pattern, interference, distortion, unpredictability, plasticity and perception.
                </p>
                <p>
                    Co-founder of TEIA – programa de rádio.
                </p>
            </div>

            <div id="about-tables">
                <div id="education">
                    <p className="scaled title">Education</p>
                    <p>2019-2021 (ongoing) MA in Multimedia Art: Moving Image, Faculty of Fine Arts of the University of
                        Lisbon, PT</p>
                    <p>2019-2020 Post-Graduation in Sound Art, Faculty of Fine Arts of the University of Lisbon, PT</p>
                    <p>2016-2019 BA in Multimedia Art: Performance/Installation, Faculty of Fine Arts of the University
                        of Lisbon, PT</p>
                    <p>2005-2013 Suzuki Method and 5th grade Articulated Teaching with Visual Arts studies - Musical
                        Theory, Orchestra and Individual Violin Classes -, Conservatório de Portimão Joly Braga Santos,
                        Portimão, PT</p>
                </div>
                <div id="exhibitions">
                    <p className="scaled title">Solo Exhibitions</p>
                    <p>2017 Drenagem, EMARP – Empresa Municipal de Águas e Resíduos de Portimão, Portimão, PT</p>
                    <p>2017 Drenagem, Chocolate Lounge, Portimão, PT</p>
                    <p>2016 Drenagem, Galeria XXI, Portimão, PT</p>
                </div>
            </div>

        </main>
    )
}

export default App;
