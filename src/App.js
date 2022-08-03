import './App.css';
import {useState} from "react";
import {
    Routes,
    Route, NavLink, useLocation
} from "react-router-dom";
import {isMobile} from 'react-device-detect';
import ReactPlayer from 'react-player';

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

/*
            media: [
                {type: "image", url: "/adrianajoao/iwanttosee.jpg"},
                {type: "youtube", url: "/adrianajoao/iwanttosee.jpg"},
                {type: "vimeo", url: "/adrianajoao/iwanttosee.jpg"},
                {type: "html", html: "..."}
            ],
*/

function App() {
    const projects = shufflePos(require("./projects.json"));
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Index projects={projects}/>}/>

                <Route path="/projects" element={<Projects projects={projects}/>}/>

                {projects.map(p => <Route key={p.url} path={`/projects/${p.url}`} element={<Project project={p}/>}/>)}

                <Route path="/about" element={<About/>}/>
            </Routes>
            <nav>
                <div id="projects-navlink-ctn" className="navlink-ctn inverted">
                    <NavLink
                        className="navlink"
                        to="/projects"
                        style={({isActive}) => ({textDecoration: isActive ? "underline" : "none"})}
                    >
                        PROJECTS
                    </NavLink>
                </div>
                <div id="about-navlink-ctn" className="navlink-ctn inverted">
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
                className={"inverted name-corner"}
                to="/"
            >
                ADRIANA JOÃO
            </NavLink>
        </div>
    );
}

function isHome(url) {
    return url === "/" ;
}

function Index(props) {
    const [previewSrc, setPreviewSrc] = useState("data:,")
    const [previewAlt, setPreviewAlt] = useState("")
    return (
        <main>
            {props.projects.map(p =>
                <div className="project-floating inverted"
                     style={{top: p.top + "%", left: p.left + "%"}}
                     onMouseEnter={() => {
                         setPreviewSrc(p.thumbnail);
                         setPreviewAlt(p.title);
                     }}
                     onMouseLeave={() => {
                         setPreviewSrc("data:,");
                         setPreviewAlt("");
                     }}
                >
                    <NavLink to={`/projects/${p.url}`} className="navlink">{p.title}</NavLink>
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
                        <NavLink to={`${p.url}`} className="navlink">
                            <div id="project-title-mobile" className="inverted">{p.title} ({p.year})</div>
                            <img id="project-thumbnail-mobile" src={p.thumbnail} alt={p.title} width="100%"/>
                        </NavLink>)}
                </div>:
                <table id="projects">
                    <tbody>
                    {props.projects.map(p =>
                            <tr
                                className="inverted project-row"
                                onMouseEnter={() => {
                                    setPreviewSrc(p.thumbnail);
                                    setPreviewAlt(p.title);
                                }}
                                onMouseLeave={() => {
                                    setPreviewSrc("data:,");
                                    setPreviewAlt("")
                                }}
                            >
                                <td><NavLink to={`${p.url}`} className="navlink">{p.title}</NavLink></td>
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
                <p id="project-title" className="inverted">{props.project.title}<br/>{props.project.year}</p>
                <p dangerouslySetInnerHTML={{__html: props.project.about_en.media}}/>
                <p dangerouslySetInnerHTML={{__html: props.project.about_en.synopsis}}/>
                <div id="project-gallery">
                    {/*<ImageGallery
                        showPlayButton={false}
                        autoplay={false}
                        items={[{original: "../"+props.project.thumbnail},{original: "../"+props.project.thumbnail},{original: "../"+props.project.image}]}
                    />*/}
                    {props.project.media.map(m => {
                            switch (m.type) {
                                case "image":
                                    return <img src={m.url} alt={m.alt ? m.alt : props.project.title} width="100%" onLoad={setMainHeight}/>;
                                case "embed":
                                    return <div onLoad={setMainHeight} className="project-embed"><ReactPlayer url={m.url} width="100%"/></div>
                                default:
                                    return null
                            }
                        }
                    )}

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
            <div id="about-main">
                <div id="about-text" className="mb-3em">
                    <p className="title">CV</p>
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
                    <div id="education" className="mb-3em">
                        <p className="title">Education</p>
                        <p>2019-2021 (ongoing) MA in Multimedia Art: Moving Image, Faculty of Fine Arts of the University of
                            Lisbon, PT</p>
                        <p>2019-2020 Post-Graduation in Sound Art, Faculty of Fine Arts of the University of Lisbon, PT</p>
                        <p>2016-2019 BA in Multimedia Art: Performance/Installation, Faculty of Fine Arts of the University
                            of Lisbon, PT</p>
                        <p>2005-2013 Suzuki Method and 5th grade Articulated Teaching with Visual Arts studies - Musical
                            Theory, Orchestra and Individual Violin Classes -, Conservatório de Portimão Joly Braga Santos,
                            Portimão, PT</p>
                    </div>
                    <div id="exhibitions" className="mb-3em">
                        <p className="title">Solo Exhibitions</p>
                        <p>2017 Drenagem, EMARP – Empresa Municipal de Águas e Resíduos de Portimão, Portimão, PT</p>
                        <p>2017 Drenagem, Chocolate Lounge, Portimão, PT</p>
                        <p>2016 Drenagem, Galeria XXI, Portimão, PT</p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default App;
