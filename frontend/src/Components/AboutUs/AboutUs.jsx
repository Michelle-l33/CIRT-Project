import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import AUSidebar from "./AUSidebar";
import Footer from '../HomePage/Footer/Footer';
import styles from './AboutUs.module.css';
import city from '../../Asset/city.jpg';

const AboutUs = () =>{
    const [selectedSection, setSelectedSection] = useState("about");

    const renderContent = () => { //this is from chat
        switch (selectedSection) {
          case "about":
            return (
                <>
                    <div className={styles.intro}>
                        <p>The vision of the Criminology Institute for Research and Training (CIRT) is to become a catalyst and leader in research for criminal justice related organizations locally and nationwide.</p>
                        <p>Organized in 2023, the CIRT is designed to offer a variety of academic pursuits including: education for students and training for criminal justice professionals; engaging in local, regional, and nationwide criminal justice research and policy events; publishing and promoting high-level multidisciplinary research; expanding faculty and student reach in grant and funding opportunities; and coordinating further collaboration with local criminal justice agencies.</p>
                        <p>CIRT is based out of the <a href="https://www.ut.edu/academics/college-of-social-sciences-mathematics-and-education">College of Social Sciences, Mathematics and Education (CSSME)</a> and is linked to the <a href="https://www.ut.edu/academics/college-of-social-sciences-mathematics-and-education/criminology-and-criminal-justice-degrees">Department of Criminology and Criminal Justice</a> at The University of Tampa. The CIRT supports research and training between faculty, students and criminal justice agencies in an effort to improve policy and practice.</p>
                    </div>
                    <h3 className={styles.sectionTitle}>CIRT Functions</h3>
                    <div className={styles.functions}>
                        <p>The CIRT supports the overall vision of The University by further strengthening existing programs and departments, furthering the training and success of graduate students, increasing the recognition of the Department of Criminology and Criminal Justice as well as UT, while also creating external funding opportunities.</p>
                        <p>The CIRT has four specific functions:</p>
                        <ol>
                            <li>
                            Encourage networking and collaboration between UT scholars and criminal justice agencies and businesses;
                            </li>

                            <li>
                            Provide learning resources and training for students, faculty and criminal justice professionals;
                            </li>
                            <li>
                            Prepare students for future careers in the ever-changing field of criminal justice; and
                            </li>

                            <li>
                            Provide a central hub for the intersection of research, training and student engagement within the Department of Criminology and Criminal Justice. 
                            </li>
                        </ol>
                    </div>
                </>
            );
          case "associates":
            return (
                <>
                    <div className={styles.facultyList}>
                    <h2>Faculty Interests and Specialties</h2>

                    <div className={styles.member}>
                        <h3>Brandon Dulisse, Director of CIRT</h3>
                        <p>Email: <a href="mailto:Bdulisse@ut.edu">Bdulisse@ut.edu</a></p>
                        <p><strong>Specialties:</strong> Corrections, Cybercrime, Financial Crime, Criminal Justice Policy</p>
                    </div>

                    <div className={styles.member}>
                        <h3>Nate Connealy, Associate Director of Consultation and Training</h3>
                        <p>Email: <a href="mailto:Nconnealy@ut.edu">Nconnealy@ut.edu</a></p>
                        <p><strong>Specialties:</strong> Policing/Law Enforcement, Criminal Justice Policy, Quantitative Data</p>
                        <p><strong>Training and Skills:</strong> GIS, Statistics, Crime Mapping</p>
                    </div>

                    <div className={styles.member}>
                        <h3>Chivon Fitch, CIRT Liaison to the Industry Advisory Board</h3>
                        <p>Email: <a href="mailto:Cfitch@ut.edu">Cfitch@ut.edu</a></p>
                        <p><strong>Specialties:</strong> Policing/Law Enforcement, Criminal Justice Policy, Victimization, Corrections, Social Justice/Criminal Justice Reform</p>
                        <p><strong>Training and Skills:</strong> Statistics and Data Analysis</p>
                    </div>

                    <div className={styles.member}>
                        <h3>Tim Hart, Associate Director of Research and Engagement</h3>
                        <p>Email: <a href="mailto:Thart@ut.edu">Thart@ut.edu</a></p>
                        <p><strong>Specialties:</strong> Victimization, Crime Analysis/Mapping</p>
                        <p><strong>Training and Skills:</strong> GIS, Statistics and Data Analysis</p>
                    </div>

                    <div className={styles.member}>
                        <h3>Amanda Osuna, Research Associate</h3>
                        <p>Email: <a href="mailto:Aosuna@ut.edu">Aosuna@ut.edu</a></p>
                        <p><strong>Specialties:</strong> Victimization, Vulnerability and Intersectionality</p>
                        <p><strong>Training and Skills:</strong> Qualitative Research Methods</p>
                    </div>

                    <div className={styles.member}>
                        <h3>Leo Genco, Research Associate</h3>
                        <p>Email: <a href="mailto:Lgenco@ut.edu">Lgenco@ut.edu</a></p>
                        <p><strong>Specialties:</strong> Violent Crime, Wildlife and Environmental Crime, Animal Cruelty</p>
                        <p><strong>Training and Skills:</strong> Statistics and Data Analysis</p>
                    </div>

                    <div className={styles.member}>
                        <h3>Carly Hilinski-Rosick, Research Associate</h3>
                        <p>Email: <a href="mailto:Chilinskirosick@ut.edu">Chilinskirosick@ut.edu</a></p>
                        <p><strong>Specialties:</strong> Victimization, Corrections</p>
                    </div>

                    <div className={styles.member}>
                        <h3>Cedric Michel, Research Associate</h3>
                        <p>Email: <a href="mailto:Cmichel@ut.edu">Cmichel@ut.edu</a></p>
                        <p><strong>Specialties:</strong> Criminal Justice Policy, Victimization, Courts/Sentencing, Criminal Justice Reform, White-Collar Crime, Death Penalty</p>
                    </div>

                    <div className={styles.member}>
                        <h3>Kathryn Branch, Research Associate</h3>
                        <p>Email: <a href="mailto:kbranch@ut.edu">kbranch@ut.edu</a></p>
                        <p><strong>Specialties:</strong> Victimization</p>
                    </div>

                    <div className={styles.member}>
                        <h3>Kayla Toohy, Research Associate</h3>
                        <p>Email: <a href="mailto:ktoohy@ut.edu">ktoohy@ut.edu</a></p>
                        <p><strong>Specialties:</strong> Victimization, Violent Crime</p>
                        <p><strong>Training and Skills:</strong> GIS, Quantitative Data Analysis</p>
                    </div>

                    <div className={styles.member}>
                        <h3>Rhissa Briones Robinson, Research Associate</h3>
                        <p>Email: <a href="mailto:rrobinson@ut.edu">rrobinson@ut.edu</a></p>
                        <p><strong>Specialties:</strong> Victimization, Violent Crime, Juvenile Delinquency, Theoretical Approaches</p>
                        <p><strong>Training and Skills:</strong> Statistics, Data Analysis</p>
                    </div>

                    <div className={styles.member}>
                        <h3>Gabriel Paez, Research Associate</h3>
                        <p>Email: <a href="mailto:gpaez@ut.edu">gpaez@ut.edu</a></p>
                        <p><strong>Specialties:</strong> Policing/Law Enforcement, Victimization</p>
                        <p><strong>Training and Skills:</strong> Statistics, Data Analysis</p>
                    </div>

                    <div className={styles.member}>
                        <h3>Cassidy Tevlin, Research Associate</h3>
                        <p>Email: <a href="mailto:ctevlin@ut.edu">ctevlin@ut.edu</a></p>
                        <p><strong>Specialties:</strong> Criminal Justice Policy, Juvenile Justice, Developmental Criminology, Biosocial Criminology</p>
                    </div>
                    </div>

                </>
            );
          default:
            return <p>Welcome to our organization!</p>;
        }
      };

    return (

        <div className={styles.AboutUs}>
            <header>
                <NavBar/>
            </header>

            <div className={styles.mainPic}>
                <img src={city}></img>
            </div>

            <div className={styles.contentSection}>
                <div className={styles.sidebar}>
                    <AUSidebar onSelect={(setSelectedSection)}/>
                    <div className={styles.contactCard}>
                        <h3>Contact Information</h3>
                        <p><strong>Brandon Dulisse, Ph.D.</strong></p>
                        <p>Director of CIRT</p>
                        <p><a href="mailto:bdulisse@ut.edu">Bdulisse@ut.edu</a></p>
                        <p>401 W. Kennedy Blvd.<br />Tampa, FL 33606-1490</p>
                    </div>

                </div>

                <div className={styles.info}>
                    {renderContent()}
                </div>
            </div>
        
            <footer className={styles.footer}>
                <Footer />
            </footer>
        </div>

    );
};
export default AboutUs;