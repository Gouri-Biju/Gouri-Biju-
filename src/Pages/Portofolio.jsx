import React, { useEffect, useState, useCallback } from "react";

import { supabase } from "../supabase"; 

import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";


const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);


function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

// techStacks tetap sama
// const techStacks = [
//   { icon: "html.svg", language: "HTML" },
//   { icon: "css.svg", language: "CSS" },
//   { icon: "javascript.svg", language: "JavaScript" },
//   { icon: "tailwind.svg", language: "Tailwind CSS" },
//   { icon: "reactjs.svg", language: "ReactJS" },
//   { icon: "vite.svg", language: "Vite" },
//   { icon: "nodejs.svg", language: "Node JS" },
//   { icon: "bootstrap.svg", language: "Bootstrap" },
//   { icon: "firebase.svg", language: "Firebase" },
//   { icon: "MUI.svg", language: "Material UI" },
//   { icon: "vercel.svg", language: "Vercel" },
//   { icon: "SweetAlert.svg", language: "SweetAlert2" },
// ];

const defaultProjects = [
  {
    id: 1,
    Img: "accident-detection.png",
    Title: "NextLeap (AI powered Career Guidance Admission Chance Predictor )",
    Description: "Built an ML-powered adaptive chatbot and admission predictor platform for students, parents, and colleges.",
    Link: "https://github.com/Gouri-Biju/NextLeap-AI-powered-Career-Guidance-Admission-Chance-Predictor",
  },
  {
    id: 2,
    Img: "Novira.png",
    Title: "Novira (NextGen-Image-sharing-app) ",
    Description: "Developed a partition–encrypt–stitch pipeline for secure peer-to-peer image sharing.",
    Link: "https://github.com/Gouri-Biju/Novira---NextGen-Image-sharing-app",
  },
  {
    id: 4,
    Img: "smart.png",
    Title: "Smart Ration",
    Description: "Developed a digital Public Distribution System (PDS)",
    Link: "https://github.com/yourusername/career-guidance",
  },
  {
    id: 5,
    Img: "street.png",
    Title: "AI-Powered Smart Street and Home Security System",
    Description: "Developed AI system for accident detection, emergency alerts, gesture-based help alarm for women’s safety and adaptive lighting automation ",
    Link: "https://github.com/yourusername/landslide-detection",
  },
  {
    id: 6,
    Img: "employee.png",
    Title: "VisionGuard: Employee Detection System",
    Description: "Developed a computer vision pipeline with OpenCV to detect and highlight employees in images using LAB color space segmentation, contour analysis, and area-based filtering.",
    Link: "https://github.com/yourusername/portfolio",
  },
  {
    id: 7,
    Img: "candyv.png",
    Title: "CandyVision: Intelligent Candy Detection and Counting System (Using Computer Vision)",
    Description: "Developed a vision-based system using OpenCV for accurate candy detection and counting, leveraging contour analysis, adaptive thresholding, and real-time recognition.",
    Link: "https://github.com/yourusername/portfolio",
  },
  {
    id: 8,
    Img: "yolo.png",
    Title: "MultiVision AI: Real-Time Object Detection with YOLOv3",
    Description: "Engineered a YOLOv3-powered detection pipeline with OpenCV, integrating Non-Maximum Suppression (NMS) and confidence-based filtering for precise multi-object tracking in real time.",
    Link: "https://github.com/yourusername/portfolio",
  },  {
    id: 9,
    Img: "portfolio.png",
    Title: "ATS-Friendly Resume Builder",
    Description: "Built an AI-powered ATS resume generator using Streamlit and Hugging Face Transformers, automating professional summary, project descriptions, and internship details to align resumes with job descriptions.",
    Link: "https://github.com/yourusername/portfolio",
  },  {
    id: 10,
    Img: "Fooddelivery.png",
    Title: "FoodieHub: Online Food Ordering & Delivery Platform",
    Description: "Built a React-based frontend for a food booking and delivery platform, featuring restaurant browsing, menu selection, cart management and payment.",
    Link: "https://github.com/yourusername/portfolio",
  },
  {
    id: 11,
    Img: "titanic.png",
    Title: "Titanic Survival Prediction App",
    Description: "Built an interactive ML web app with Streamlit that predicts Titanic passenger survival using a trained classification model with engineered features.",
    Link: "https://github.com/yourusername/portfolio",
  },
  {
    id: 12,
    Img: "portfolio.png",
    Title: "CarromVision: Queen Coin Detection System",
    Description: "Engineered a computer vision solution using OpenCV to detect the Queen coin on a Carrom board through LAB color segmentation, contour analysis, and shape detection.",
    Link: "https://github.com/Gouri-Biju/CarromQueenDetector-OpenCV",
  },  {
    id: 13,
    Img: "portfolio.png",
    Title: "Titanic Survival Prediction App",
    Description: "Built an interactive ML web app with Streamlit that predicts Titanic passenger survival using a trained classification model with engineered features.",
    Link: "https://github.com/Gouri-Biju/Opencv-Counting-Objects",
  },  {
    id: 14,
    Img: "portfolio.png",
    Title: "Automated Object Counting System using OpenCV",
    Description: "Developed an OpenCV-based system to detect and count objects using preprocessing, contour detection, and adaptive thresholding.",
    Link: "https://github.com/yourusername/portfolio",
  },  
  {
    id: 15,
    Img: "portfolio.png",
    Title: "Sports Complex Booking Platform",
    Description: "Built with Django, Firebase & MySQL for real-time slot reservations, booking history, and admin dispute management, automating the manual process.",
    Link: "https://github.com/yourusername/portfolio",
  },
{
    id: 16,
    Img: "portfolio.png",
    Title: "PathFinder: Career & Job Guidance Platform",
    Description: "Connects students with mentors, institutions, and AI-based suggestions, enabling seminar participation and direct access to job opportunities for smart career decisions.",
    Link: "https://github.com/yourusername/portfolio",
  },
  {
    id: 17,
    Img: "portfolio.png",
    Title: "MediConnect",
    Description: "Healthcare platform for appointments, prescriptions, vaccinations, and patient-doctor communication.",
    Link: "https://github.com/Gouri-Biju/MediConnect",
  },
  {
    id: 18,
    Img: "portfolio.png",
    Title: "ShopMee",
    Description: "All-in-one e-commerce platform for shopping, orders, payments, and delivery management.",
    Link: "https://github.com/Gouri-Biju/ShopMee",
  },

];

const techStacks = [
  //Frontend
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  // Programming Languages
  { icon: "python.svg", language: "Python" },
  { icon: "c.svg", language: "C" },
  { icon: "cpp.svg", language: "C++" },

  // Frameworks & Libraries
  { icon: "django.svg", language: "Django" },
  { icon: "flutter.svg", language: "Flutter" },
  { icon: "react.svg", language: "React" },
  { icon: "opencv.svg", language: "OpenCV" },

  // Databases
  { icon: "mysql.svg", language: "MySQL" },
  { icon: "firebase.svg", language: "Firebase" },


  // Tools & IDEs
  { icon: "git.svg", language: "Git" },
  { icon: "github.svg", language: "GitHub" },
  { icon: "vscode.svg", language: "VS Code" },
  { icon: "pycharm.svg", language: "PyCharm" },

  // Deployment & Cloud
  { icon: "render.svg", language: "Render" },
  { icon: "vercel.svg", language: "Vercel" },

  // Other Skills / Libraries
  { icon: "ml.svg", language: "Machine Learning" },
  { icon: "ai.svg", language: "AI / Deep Learning" },
  { icon: "opencv.svg", language: "Computer Vision" }
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState(defaultProjects);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);


  const fetchData = useCallback(async () => {
    try {
      // Mengambil data dari Supabase secara paralel
      const [projectsResponse, certificatesResponse] = await Promise.all([
        supabase.from("projects").select("*").order('id', { ascending: true }),
        supabase.from("certificates").select("*").order('id', { ascending: true }), 
      ]);

      // Error handling untuk setiap request
      if (projectsResponse.error) throw projectsResponse.error;
      if (certificatesResponse.error) throw certificatesResponse.error;

      // Supabase mengembalikan data dalam properti 'data'
      const projectData = projectsResponse.data || [];
      const certificateData = certificatesResponse.data || [];

      setProjects(projectData);
      setCertificates(certificateData);

      // Store in localStorage (fungsionalitas ini tetap dipertahankan)
      localStorage.setItem("projects", JSON.stringify(projectData));
      localStorage.setItem("certificates", JSON.stringify(certificateData));
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
    }
  }, []);



  useEffect(() => {
    // Coba ambil dari localStorage dulu untuk laod lebih cepat
    const cachedProjects = localStorage.getItem('projects');
    const cachedCertificates = localStorage.getItem('certificates');

    if (cachedProjects && cachedCertificates) {
        setProjects(JSON.parse(cachedProjects));
        setCertificates(JSON.parse(cachedCertificates));
    }
    
    fetchData(); // Tetap panggil fetchData untuk sinkronisasi data terbaru
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else {
      setShowAllCertificates(prev => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  // Sisa dari komponen (return statement) tidak ada perubahan
  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      {/* Header section - unchanged */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise. 
          Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* AppBar and Tabs section - unchanged */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          {/* Tabs remain unchanged */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": {
                    color: "#a78bfa",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Certificates"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>


          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                {projects.map((project, index) => (
                  <div
                    key={project.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <CardProject
                      Img={project.Img}
                      Title={project.Title}
                      Description={project.Description}
                      Link={project.Link}
                      id={project.id}
                    />
                  </div>
                ))}
              </div>
            </div>
            {projects.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('projects')}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                {displayedCertificates.map((certificate, index) => (
                  <div
                    key={certificate.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <Certificate ImgSertif={certificate.Img} />
                  </div>
                ))}
              </div>
            </div>
            {certificates.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('certificates')}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                {techStacks.map((stack, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>

      </Box>
    </div>
  );
}