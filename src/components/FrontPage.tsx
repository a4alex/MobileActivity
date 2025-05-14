import React, { useRef, useState } from 'react';
import paperData from '../data/paperData';
import jsPDF from 'jspdf';

const FrontPage: React.FC = () => {
  const introductionSection = paperData.sections.find(section => section.id === "1");
  const contentRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    if (!contentRef.current || isGenerating) return;
    
    try {
      setIsGenerating(true);
      
      // Create PDF document
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // PDF dimensions
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20; // 20mm margin
      const contentWidth = pageWidth - (margin * 2);
      
      // Define text styles
      const titleFontSize = 16;
      const normalFontSize = 12;
      const smallFontSize = 10;
      
      // Title page
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(titleFontSize);
      
      // Add main title
      let y = margin + 20;
      pdf.text('Mobile App Activity Monitoring for Enhanced Privacy and Security', pageWidth / 2, y, { align: 'center' });
      
      // Add subtitle
      y += 20;
      pdf.setFontSize(normalFontSize);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Submitted in partial fulfilment of the requirements for the degree of BCA', pageWidth / 2, y, { align: 'center' });
      
      // Add submitted by section
      y += 15;
      pdf.setFont('helvetica', 'italic');
      pdf.text('Submitted By', pageWidth / 2, y, { align: 'center' });
      
      y += 10;
      pdf.setFont('helvetica', 'bold');
      pdf.text('ANAND KUMAR', pageWidth / 2, y, { align: 'center' });
      
      y += 8;
      pdf.text('Roll no.: 230112033014', pageWidth / 2, y, { align: 'center' });
      
      y += 8;
      pdf.text('BCA / section-A', pageWidth / 2, y, { align: 'center' });
      
      // Add submitted to section
      y += 15;
      pdf.setFont('helvetica', 'italic');
      pdf.text('Submitted To', pageWidth / 2, y, { align: 'center' });
      
      y += 10;
      pdf.setFont('helvetica', 'bold');
      pdf.text('Apurva Vashist', pageWidth / 2, y, { align: 'center' });
      
      y += 8;
      pdf.text('Department of BCA DSEU', pageWidth / 2, y, { align: 'center' });
      
      y += 8;
      pdf.text('Department of BCA', pageWidth / 2, y, { align: 'center' });
      
      y += 8;
      pdf.text('Ambedkar Institute of Technology', pageWidth / 2, y, { align: 'center' });
      
      y += 8;
      pdf.text('Shakarpur Campus-1', pageWidth / 2, y, { align: 'center' });
      
      y += 8;
      pdf.text('DSEU', pageWidth / 2, y, { align: 'center' });
      
      y += 8;
      pdf.text('New Delhi, India', pageWidth / 2, y, { align: 'center' });
      
      y += 8;
      pdf.text('2025', pageWidth / 2, y, { align: 'center' });
      
      y += 30;
      pdf.setFontSize(titleFontSize);
      pdf.text('Delhi Skill and Entrepreneurship University (DSEU)', pageWidth / 2, y, { align: 'center' });
      
      // Certificate page
      pdf.addPage();
      y = margin + 15;
      
      pdf.setFontSize(titleFontSize);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Certificate', pageWidth / 2, y, { align: 'center' });
      
      y += 15;
      pdf.setFontSize(normalFontSize);
      pdf.setFont('helvetica', 'normal');
      
      // Split text to multiple lines to fit page width
      const certificateText1 = pdf.splitTextToSize(
        'This is to certify that the research paper titled "Mobile App Activity Monitoring for Enhanced Privacy and Security" submitted by ANAND KUMAR (Roll No: 230112033014) of BCA Section-A is an original work carried out under my supervision and guidance.',
        contentWidth
      );
      pdf.text(certificateText1, pageWidth / 2, y, { align: 'center' });
      
      y += certificateText1.length * 7;
      const certificateText2 = pdf.splitTextToSize(
        'This research paper has been prepared according to the guidelines and meets the requirements for submission as part of the BCA program at Delhi Skill and Entrepreneurship University.',
        contentWidth
      );
      pdf.text(certificateText2, pageWidth / 2, y, { align: 'center' });
      
      y += 60;
      pdf.text('Date: ____________', margin, y);
      pdf.text('________________', pageWidth - margin - 30, y);
      
      y += 8;
      pdf.text('Place: New Delhi', margin, y);
      pdf.text('Apurva Vashist', pageWidth - margin - 30, y);
      
      y += 8;
      pdf.text('Department of BCA', pageWidth - margin - 30, y);
      
      y += 8;
      pdf.text('DSEU', pageWidth - margin - 30, y);
      
      // Declaration page
      pdf.addPage();
      y = margin + 15;
      
      pdf.setFontSize(titleFontSize);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Declaration', pageWidth / 2, y, { align: 'center' });
      
      y += 15;
      pdf.setFontSize(normalFontSize);
      pdf.setFont('helvetica', 'normal');
      
      const declarationText1 = pdf.splitTextToSize(
        'I hereby declare that the research paper titled "Mobile App Activity Monitoring for Enhanced Privacy and Security" is an original piece of work carried out by me. The content presented in this paper is based on my independent research, and any references used have been duly cited. I have not plagiarized or reproduced any part of the work from other sources without appropriate acknowledgment. This research has not been submitted previously for any academic award or examination.',
        contentWidth
      );
      pdf.text(declarationText1, margin, y);
      
      y += declarationText1.length * 7;
      const declarationText2 = pdf.splitTextToSize(
        'I affirm that all the information provided in this paper is accurate to the best of my knowledge, and I take full responsibility for the content of the paper. Any errors or omissions are unintentional and will be rectified as per the feedback received.',
        contentWidth
      );
      pdf.text(declarationText2, margin, y);
      
      y += 60;
      pdf.text('Date: ____________', margin, y);
      pdf.text('________________', pageWidth - margin - 30, y);
      
      y += 8;
      pdf.text('Place: New Delhi', margin, y);
      pdf.text('ANAND KUMAR', pageWidth - margin - 30, y);
      
      y += 8;
      pdf.text('Roll No: 230112033014', pageWidth - margin - 30, y);
      
      // Acknowledgments page
      pdf.addPage();
      y = margin + 15;
      
      pdf.setFontSize(titleFontSize);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Acknowledgments', pageWidth / 2, y, { align: 'center' });
      
      y += 15;
      pdf.setFontSize(normalFontSize);
      pdf.setFont('helvetica', 'normal');
      
      const ackText1 = pdf.splitTextToSize(
        'I would like to express my sincere gratitude to everyone who contributed to the successful completion of this research.',
        contentWidth
      );
      pdf.text(ackText1, margin, y);
      
      y += ackText1.length * 7;
      const ackText2 = pdf.splitTextToSize(
        'First and foremost, I thank my faculty advisor, Apurva Vashist, for their invaluable guidance, continuous support, and constructive feedback throughout the course of this research. Their insights have been pivotal in shaping the direction of this work.',
        contentWidth
      );
      pdf.text(ackText2, margin, y);
      
      y += ackText2.length * 7;
      const ackText3 = pdf.splitTextToSize(
        'I would also like to extend my gratitude to Delhi Skill and Entrepreneurship University (DSEU) for providing the necessary resources and infrastructure that enabled me to carry out this research effectively.',
        contentWidth
      );
      pdf.text(ackText3, margin, y);
      
      y += ackText3.length * 7;
      const ackText4 = pdf.splitTextToSize(
        'I am grateful to my friends, family, and colleagues for their moral support and encouragement during the research process. Special thanks to my classmates and faculty members for their assistance in collecting data and reviewing my work.',
        contentWidth
      );
      pdf.text(ackText4, margin, y);
      
      y += ackText4.length * 7;
      const ackText5 = pdf.splitTextToSize(
        'Lastly, I would like to thank the developers and security experts whose contributions in mobile security have served as the foundation for this research.',
        contentWidth
      );
      pdf.text(ackText5, margin, y);
      
      y += ackText5.length * 7;
      const ackText6 = pdf.splitTextToSize(
        'Without the help and support of these individuals and organizations, this research would not have been possible.',
        contentWidth
      );
      pdf.text(ackText6, margin, y);
      
      // Abstract page
      pdf.addPage();
      y = margin + 15;
      
      pdf.setFontSize(titleFontSize);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Abstract', pageWidth / 2, y, { align: 'center' });
      
      y += 15;
      pdf.setFontSize(normalFontSize);
      pdf.setFont('helvetica', 'normal');
      
      const abstractText1 = pdf.splitTextToSize(
        'Mobile applications have become an essential part of everyday life, facilitating communication, entertainment, and productivity. However, with their increasing role in our digital ecosystem, the risks to user privacy and data security have grown exponentially. Users often grant extensive permissions to mobile apps, such as access to location data, camera, microphone, and files, without fully understanding the implications of these permissions. This lack of transparency leaves users vulnerable to privacy invasions and unauthorized data usage by malicious or overly intrusive applications.',
        contentWidth
      );
      pdf.text(abstractText1, margin, y);
      
      y += abstractText1.length * 7;
      const abstractText2 = pdf.splitTextToSize(
        'This research proposes a novel system aimed at monitoring and logging mobile app behaviors to provide real-time insights into how applications access sensitive resources on a mobile device. The system would log app access to critical resources such as the camera, microphone, GPS, storage, and network. It would track not only the type of access but also the duration and frequency of resource usage. The goal is to give users complete control over their personal data and ensure they are informed about potential misuse.',
        contentWidth
      );
      pdf.text(abstractText2, margin, y);
      
      y += abstractText2.length * 7;
      const abstractText3 = pdf.splitTextToSize(
        'The paper explores the existing limitations in mobile security systems, focusing on the lack of real-time transparency in app behavior and the need for more detailed monitoring mechanisms. It proposes an architecture for a background monitoring service integrated into the mobile operating system, which provides users with clear, understandable logs and visual representations of app activity. These logs would allow users to identify suspicious or unusual behavior, such as unauthorized background processes, excessive access to sensitive data, or other privacy-invasive actions.',
        contentWidth
      );
      pdf.text(abstractText3, margin, y);
      
      y += abstractText3.length * 7;
      const abstractText4 = pdf.splitTextToSize(
        'The system also provides users with alert notifications when apps engage in unusual activities, such as accessing sensitive resources at irregular times or beyond reasonable limits. The ultimate goal is to empower users with better control over their mobile security by raising awareness of app behavior and enhancing privacy protections.',
        contentWidth
      );
      pdf.text(abstractText4, margin, y);
      
      y += abstractText4.length * 7;
      const abstractText5 = pdf.splitTextToSize(
        'The findings of this research have significant implications for mobile device users, app developers, and cybersecurity professionals. It highlights the importance of transparency in app behavior and advocates for stronger user controls in mobile operating systems.',
        contentWidth
      );
      pdf.text(abstractText5, margin, y);
      
      // Introduction section
      pdf.addPage();
      y = margin + 15;
      
      pdf.setFontSize(titleFontSize);
      pdf.setFont('helvetica', 'bold');
      pdf.text('1. Introduction', pageWidth / 2, y, { align: 'center' });
      
      // 1.1 Overview of Mobile Security
      y += 15;
      pdf.setFontSize(normalFontSize + 2);
      pdf.setFont('helvetica', 'bold');
      pdf.text('1.1 Overview of Mobile Security', margin, y);
      
      y += 10;
      pdf.setFontSize(normalFontSize);
      pdf.setFont('helvetica', 'normal');
      
      const introText1 = pdf.splitTextToSize(
        'Mobile security refers to the measures taken to protect smartphones, tablets, and other portable devices from digital threats. As mobile devices increasingly store sensitive personal and business information, they have become prime targets for attackers. Android and iOS have implemented essential security features such as:',
        contentWidth
      );
      pdf.text(introText1, margin, y);
      
      y += introText1.length * 7;
      pdf.text('Runtime Permissions: Apps must request permissions like camera or location access during runtime, enhancing user control.', margin + 5, y);
      
      y += 7;
      pdf.text('System Security: App sandboxing, secure inter-process communication, and code signing provide a secure foundation.', margin + 5, y);
      
      y += 7;
      pdf.text('Privacy Controls: Platforms offer dashboards and privacy settings, allowing users to manage data access and track app behavior.', margin + 5, y);
      
      y += 10;
      const introText2 = pdf.splitTextToSize(
        'Despite these efforts, mobile security remains an evolving challenge due to growing threats and complex app behaviors.',
        contentWidth
      );
      pdf.text(introText2, margin, y);
      
      // 1.2 Device Usage Statistics
      y += introText2.length * 7 + 10;
      pdf.setFontSize(normalFontSize + 2);
      pdf.setFont('helvetica', 'bold');
      pdf.text('1.2 Device Usage Statistics', margin, y);
      
      y += 10;
      pdf.setFontSize(normalFontSize);
      pdf.setFont('helvetica', 'normal');
      
      const statText = pdf.splitTextToSize(
        'With over 72% of internet users accessing services primarily through mobile phones, smartphones have become the dominant computing device globally. This shift makes mobile platforms an attractive vector for cyber threats, as sensitive activities—from banking to personal communication—are handled via mobile apps. Consequently, the need for specialized mobile privacy and security solutions has never been greater.',
        contentWidth
      );
      pdf.text(statText, margin, y);
      
      // 1.3 Importance of App Privacy
      y += statText.length * 7 + 10;
      pdf.setFontSize(normalFontSize + 2);
      pdf.setFont('helvetica', 'bold');
      pdf.text('1.3 Importance of App Privacy', margin, y);
      
      y += 10;
      pdf.setFontSize(normalFontSize);
      pdf.setFont('helvetica', 'normal');
      
      const privacyText = pdf.splitTextToSize(
        'Mobile applications often request access to personal data such as contacts, photos, location, and biometric details. Without transparent permissions and behavioral tracking, users may unknowingly expose sensitive information. App privacy ensures users remain informed, in control, and protected from unauthorized data access or misuse.',
        contentWidth
      );
      pdf.text(privacyText, margin, y);
      
      // 1.4 Current Limitations in Mobile Security Systems
      y += privacyText.length * 7 + 10;
      pdf.setFontSize(normalFontSize + 2);
      pdf.setFont('helvetica', 'bold');
      pdf.text('1.4 Current Limitations in Mobile Security Systems', margin, y);
      
      y += 10;
      pdf.setFontSize(normalFontSize);
      pdf.setFont('helvetica', 'normal');
      
      const limitIntro = pdf.splitTextToSize(
        'Despite advancements, existing mobile security systems face several critical shortcomings:',
        contentWidth
      );
      pdf.text(limitIntro, margin, y);
      
      // Add limitations as bullet points
      y += limitIntro.length * 7 + 5;
      pdf.setFont('helvetica', 'bold');
      pdf.text('a) Static Permission Model', margin, y);
      y += 7;
      pdf.setFont('helvetica', 'normal');
      const limitA = pdf.splitTextToSize(
        'Once users grant permissions, apps can continuously access resources like the microphone or GPS without further prompts, limiting user awareness.',
        contentWidth - 10
      );
      pdf.text(limitA, margin + 10, y);
      
      y += limitA.length * 7 + 5;
      pdf.setFont('helvetica', 'bold');
      pdf.text('b) Lack of Real-Time Monitoring', margin, y);
      y += 7;
      pdf.setFont('helvetica', 'normal');
      const limitB = pdf.splitTextToSize(
        'There\'s no built-in way for users to see when or how long apps access system resources—leading to unnoticed misuse.',
        contentWidth - 10
      );
      pdf.text(limitB, margin + 10, y);
      
      // Add a new page if content exceeds current page
      if (y > pageHeight - margin * 2) {
        pdf.addPage();
        y = margin;
      }
      
      y += limitB.length * 7 + 5;
      pdf.setFont('helvetica', 'bold');
      pdf.text('c) Limited Visibility & Logging', margin, y);
      y += 7;
      pdf.setFont('helvetica', 'normal');
      const limitC = pdf.splitTextToSize(
        'Privacy dashboards (like Android 12+) offer high-level summaries but lack detailed logs, timestamps, or notifications about unusual access.',
        contentWidth - 10
      );
      pdf.text(limitC, margin + 10, y);
      
      y += limitC.length * 7 + 5;
      pdf.setFont('helvetica', 'bold');
      pdf.text('d) No Centralized Behavioral Analysis', margin, y);
      y += 7;
      pdf.setFont('helvetica', 'normal');
      const limitD = pdf.splitTextToSize(
        'Users cannot analyze trends in app activity over time, making it hard to detect suspicious or abnormal patterns.',
        contentWidth - 10
      );
      pdf.text(limitD, margin + 10, y);
      
      // Check if need new page
      if (y > pageHeight - margin * 3) {
        pdf.addPage();
        y = margin;
      }
      
      y += limitD.length * 7 + 5;
      pdf.setFont('helvetica', 'bold');
      pdf.text('e) Usability Barriers for Non-Tech Users', margin, y);
      y += 7;
      pdf.setFont('helvetica', 'normal');
      const limitE = pdf.splitTextToSize(
        'Existing tools are not user-friendly, often requiring technical knowledge to interpret and act on security insights.',
        contentWidth - 10
      );
      pdf.text(limitE, margin + 10, y);
      
      y += limitE.length * 7 + 5;
      pdf.setFont('helvetica', 'bold');
      pdf.text('f) Knowledge and Awareness Gaps', margin, y);
      y += 7;
      pdf.setFont('helvetica', 'normal');
      const limitF = pdf.splitTextToSize(
        'Users may confuse security with privacy, or overestimate their ability to protect themselves, resulting in poor decision-making.',
        contentWidth - 10
      );
      pdf.text(limitF, margin + 10, y);
      
      // Add a new page for remaining limitations
      pdf.addPage();
      y = margin;
      
      pdf.setFont('helvetica', 'bold');
      pdf.text('g) Lack of Motivation and Social Influence', margin, y);
      y += 7;
      pdf.setFont('helvetica', 'normal');
      const limitG = pdf.splitTextToSize(
        'Current systems don\'t effectively use social or psychological drivers to encourage proactive security behavior.',
        contentWidth - 10
      );
      pdf.text(limitG, margin + 10, y);
      
      y += limitG.length * 7 + 5;
      pdf.setFont('helvetica', 'bold');
      pdf.text('h) Interface & Screen Constraints', margin, y);
      y += 7;
      pdf.setFont('helvetica', 'normal');
      const limitH = pdf.splitTextToSize(
        'Small mobile screens limit the clarity and visibility of privacy policies and security settings, reducing user understanding and engagement.',
        contentWidth - 10
      );
      pdf.text(limitH, margin + 10, y);
      
      y += limitH.length * 7 + 5;
      pdf.setFont('helvetica', 'bold');
      pdf.text('i) Early Stage Industry Practices', margin, y);
      y += 7;
      pdf.setFont('helvetica', 'normal');
      const limitI = pdf.splitTextToSize(
        'Many developers prioritize speed and features over privacy, often skipping privacy policies or mismanaging user data.',
        contentWidth - 10
      );
      pdf.text(limitI, margin + 10, y);
      
      y += limitI.length * 7 + 5;
      pdf.setFont('helvetica', 'bold');
      pdf.text('j) Unique Data Types', margin, y);
      y += 7;
      pdf.setFont('helvetica', 'normal');
      const limitJ = pdf.splitTextToSize(
        'Mobile apps can access sensitive data like biometrics, precise location, SMS, and device IDs—raising privacy concerns beyond desktop systems.',
        contentWidth - 10
      );
      pdf.text(limitJ, margin + 10, y);
      
      y += limitJ.length * 7 + 5;
      pdf.setFont('helvetica', 'bold');
      pdf.text('k) Platform Inconsistencies', margin, y);
      y += 7;
      pdf.setFont('helvetica', 'normal');
      const limitK = pdf.splitTextToSize(
        'Different OSes and versions handle permissions, dashboards, and user alerts differently, causing confusion.',
        contentWidth - 10
      );
      pdf.text(limitK, margin + 10, y);
      
      y += limitK.length * 7 + 5;
      pdf.setFont('helvetica', 'bold');
      pdf.text('l) Third-Party Risks', margin, y);
      y += 7;
      pdf.setFont('helvetica', 'normal');
      const limitL = pdf.splitTextToSize(
        'Apps often embed analytics or ads that may independently access and misuse data.',
        contentWidth - 10
      );
      pdf.text(limitL, margin + 10, y);
      
      y += limitL.length * 7 + 5;
      pdf.setFont('helvetica', 'bold');
      pdf.text('m) Limited Data Control', margin, y);
      y += 7;
      pdf.setFont('helvetica', 'normal');
      const limitM = pdf.splitTextToSize(
        'Users typically lack fine-grained controls to manage what data apps retain or share, and how to revoke or delete it.',
        contentWidth - 10
      );
      pdf.text(limitM, margin + 10, y);
      
      // Save PDF
      pdf.save('research-paper.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <button
        onClick={generatePDF}
        disabled={isGenerating}
        className={`fixed top-4 right-4 px-4 py-2 rounded text-white ${
          isGenerating ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isGenerating ? 'Generating PDF...' : 'Download PDF'}
      </button>
      <div ref={contentRef} className="flex flex-col items-center w-full">
        <div data-section="0" className="flex flex-col items-center w-full border border-gray-300 max-w-3xl mx-auto px-8 py-12 mb-10">
          <h1 className="text-4xl font-semibold mb-4 text-center"><b>Mobile App Activity Monitoring for Enhanced Privacy and Security</b></h1><br />
          <p className="text-lg mb-2 text-center">Submitted in partial fulfilment of the requirements for the degree of BCA</p>
          <p className="text-lg mb-2 text-center italic">Submitted By</p>
          <p className="text-lg mb-2 text-center bold">ANAND KUMAR</p>
          <p className="text-lg mb-2 text-center bold">Roll no.: 230112033014</p>
          <p className="text-lg mb-2 text-center bold">BCA / section-A</p> <br />
          <p className="text-lg mb-2 text-center italic">Submitted To</p>
          <p className="text-lg mb-2 text-center bold">Apurva Vashist</p>
          <p className="text-lg mb-2 text-center bold">Department of BCA DSEU</p>
          <p className="text-lg mb-2 text-center bold ">Department of BCA</p>
          <p className="text-lg mb-2 text-center bold">Ambedkar Institute of Technology</p>
          <p className="text-lg mb-2 text-center bold">Shakarpur Campus-1</p>
          <p className="text-lg mb-2 text-center bold">DSEU</p>
          <p className="text-lg mb-2 text-center bold">New Delhi, India</p>
          <p className="text-lg mb-8 text-center bold">2025</p>
          <img src="https://dseu.bestbookbuddies.com/opac-tmpl/template241/images/logo_longh.png" alt="DSEU University Logo" className="w-82 h-32 mb-6" />
          <h1 className="text-4xl font-bold mb-2 text-center">Delhi Skill and Entrepreneurship University (DSEU)</h1>
        </div>

        <div data-section="1" className="flex flex-col w-full border border-gray-300 max-w-3xl mx-auto px-8 py-12 mb-24">
          <div className="flex justify-between items-center">
            <img src="public\Delhi_Skill_and_Entrepreneurship_logo.png" alt="DSEU Logo" className="w-82 h-32 mb-6" />
            <img src="public\badge.png" alt="Badge" className="w-82 h-32 mb-6" />
          </div>
          <h1 className="text-2xl font-semibold mb-6 text-center">Certificate</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            This is to certify that the research paper titled "Mobile App Activity Monitoring for Enhanced Privacy and Security" submitted by ANAND KUMAR (Roll No: 230112033014) of BCA Section-A is an original work carried out under my supervision and guidance.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            This research paper has been prepared according to the guidelines and meets the requirements for submission as part of the BCA program at Delhi Skill and Entrepreneurship University.
          </p>
          <div className="flex justify-between items-center mt-12 px-8">
            <div>
              <p className="text-lg mb-2">Date: ____________</p>
              <p className="text-lg">Place: New Delhi</p>
            </div>
            <div>
              <p className="text-lg mb-2">________________</p>
              <p className="text-lg">Apurva Vashist</p>
              <p className="text-lg">Department of BCA</p>
              <p className="text-lg">DSEU</p>
            </div>
          </div>
        </div>

        <div data-section="2" className="flex flex-col w-full border border-gray-300 max-w-3xl mx-auto px-8 py-12 mb-24">
          <div className="flex justify-start">
            <img src="public\Delhi_Skill_and_Entrepreneurship_logo.png" alt="DSEU Logo" className="w-82 h-32 mb-6" />
          </div>
          <h1 className="text-2xl font-semibold mb-4 text-center">Declaration</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            I hereby declare that the research paper titled "Mobile App Activity Monitoring for Enhanced Privacy and Security" is an original piece of work carried out by me. The content presented in this paper is based on my independent research, and any references used have been duly cited. I have not plagiarized or reproduced any part of the work from other sources without appropriate acknowledgment. This research has not been submitted previously for any academic award or examination.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            I affirm that all the information provided in this paper is accurate to the best of my knowledge, and I take full responsibility for the content of the paper. Any errors or omissions are unintentional and will be rectified as per the feedback received.
          </p>
          <div className="flex justify-between items-center mt-12 px-8">
            <div>
              <p className="text-lg mb-2">Date: ____________</p>
              <p className="text-lg">Place: New Delhi</p>
            </div>
            <div>
              <p className="text-lg mb-2">________________</p>
              <p className="text-lg">ANAND KUMAR</p>
              <p className="text-lg">Roll No: 230112033014</p>
            </div>
          </div>
        </div>

        <div data-section="3" className="flex flex-col w-full border border-gray-300 max-w-3xl mx-auto px-8 py-12 mb-24">
          <div className="flex justify-start">
            <img src="public\Delhi_Skill_and_Entrepreneurship_logo.png" alt="DSEU Logo" className="w-82 h-32 mb-6" />
          </div>
          <h1 className="text-2xl font-semibold mb-4 text-center">Acknowledgments</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            I would like to express my sincere gratitude to everyone who contributed to the successful completion of this research.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            First and foremost, I thank my faculty advisor, Apurva Vashist, for their invaluable guidance, continuous support, and constructive feedback throughout the course of this research. Their insights have been pivotal in shaping the direction of this work.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            I would also like to extend my gratitude to Delhi Skill and Entrepreneurship University (DSEU) for providing the necessary resources and infrastructure that enabled me to carry out this research effectively.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            I am grateful to my friends, family, and colleagues for their moral support and encouragement during the research process. Special thanks to my classmates and faculty members for their assistance in collecting data and reviewing my work.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Lastly, I would like to thank the developers and security experts whose contributions in mobile security have served as the foundation for this research.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Without the help and support of these individuals and organizations, this research would not have been possible.
          </p>
        </div>

        <div data-section="4" className="flex flex-col w-full border border-gray-300 max-w-3xl mx-auto px-8 py-12 mb-24">
          <div className="flex justify-start">
            <img src="public\Delhi_Skill_and_Entrepreneurship_logo.png" alt="DSEU Logo" className="w-82 h-32 mb-6" />
          </div>
          <h1 className="text-2xl font-semibold mb-4 text-center">Abstract</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Mobile applications have become an essential part of everyday life, facilitating communication, entertainment, and productivity. However, with their increasing role in our digital ecosystem, the risks to user privacy and data security have grown exponentially. Users often grant extensive permissions to mobile apps, such as access to location data, camera, microphone, and files, without fully understanding the implications of these permissions. This lack of transparency leaves users vulnerable to privacy invasions and unauthorized data usage by malicious or overly intrusive applications.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            This research proposes a novel system aimed at monitoring and logging mobile app behaviors to provide real-time insights into how applications access sensitive resources on a mobile device. The system would log app access to critical resources such as the camera, microphone, GPS, storage, and network. It would track not only the type of access but also the duration and frequency of resource usage. The goal is to give users complete control over their personal data and ensure they are informed about potential misuse.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            The paper explores the existing limitations in mobile security systems, focusing on the lack of real-time transparency in app behavior and the need for more detailed monitoring mechanisms. It proposes an architecture for a background monitoring service integrated into the mobile operating system, which provides users with clear, understandable logs and visual representations of app activity. These logs would allow users to identify suspicious or unusual behavior, such as unauthorized background processes, excessive access to sensitive data, or other privacy-invasive actions.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            The system also provides users with alert notifications when apps engage in unusual activities, such as accessing sensitive resources at irregular times or beyond reasonable limits. The ultimate goal is to empower users with better control over their mobile security by raising awareness of app behavior and enhancing privacy protections.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FrontPage; 