import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Font } from '@react-pdf/renderer';
import resumeData from '../resumeData.json'; // Ensure the path is correct

// Register fonts
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helvetica/normal.ttf' }, // Regular font
    { src: 'https://fonts.gstatic.com/s/helvetica/bold.ttf', fontWeight: 'bold' }, // Bold font
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    backgroundColor: '#FCE8E6', // Pastel red background
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    color: '#D9534F', // Darker pastel red for headers
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    marginVertical: 8,
    color: '#D9534F',
  },
  text: {
    fontSize: 12,
    color: '#333', // Dark grey text for readability
    marginVertical: 2,
    fontFamily: 'Helvetica', // Ensure font usage
  },
  boldText: {
    fontWeight: 'bold', // Apply the bold font
    color: '#000000', // Ensure black color for bold text
    fontFamily: 'Helvetica', // Font family for Helvetica
  },
  jobDetails: {
    marginLeft: 10, // Indent job location and dates
    fontSize: 12,
    color: '#333',
  },
  line: {
    marginVertical: 8,
    borderBottom: '1px solid #D9534F', // Line separator
  },
});

const ResumePDF = () => (
  <Document>
    <Page style={styles.page}>
      {/* Header Section */}
      <View>
        <Text style={styles.header}>{resumeData.name}</Text>
        <Text style={styles.text}>{resumeData.contact.address}</Text>
        <Text style={styles.text}>{resumeData.contact.phone}</Text>
        <Text style={styles.text}>{resumeData.contact.email}</Text>
        <Text style={styles.text}>{resumeData.contact.linkedin}</Text>
      </View>

      {/* Profile Summary */}
      <View>
        <Text style={styles.sectionTitle}>Profile Summary</Text>
        <Text style={styles.text}>{resumeData.profile_summary}</Text>
      </View>

      {/* Professional Experience */}
      <View>
        <Text style={styles.sectionTitle}>Professional Experience</Text>
        {resumeData.professional_experience.map((job, index) => (
          <View key={index}>
            <Text style={[styles.text, styles.boldText]}>{job.organization} - {job.position}</Text>
            <Text style={styles.jobDetails}>{job.location} | {job.dates}</Text>
            {job.responsibilities.map((responsibility, i) => (
              <Text style={styles.text} key={i}>• {responsibility}</Text>
            ))}
            <Text style={styles.line} /> {/* Line separator after each job */}
          </View>
        ))}
      </View>
    </Page>

    {/* New Page for Key Achievements */}
    <Page style={styles.page}>
      {/* Key Achievements */}
      <View>
        <Text style={styles.sectionTitle}>Key Achievements</Text>
        {resumeData.key_achievements.map((achievement, index) => (
          <Text style={styles.text} key={index}>• {achievement}</Text>
        ))}
      </View>

      {/* Education */}
      <View>
        <Text style={styles.sectionTitle}>Education</Text>
        {resumeData.education.map((edu, index) => (
          <Text style={styles.text} key={index}>{edu.degree} in {edu.field} - {edu.institution} ({edu.years})</Text>
        ))}
      </View>

      {/* Professional Membership */}
      <View>
        <Text style={styles.sectionTitle}>Professional Membership</Text>
        {resumeData.professional_membership.map((membership, index) => (
          <View key={index}>
            <Text style={styles.text}>{membership.membership}</Text>
            <Text style={styles.text}>Organization: {membership.organization}</Text>
            <Text style={styles.line} /> {/* Line separator */}
          </View>
        ))}
      </View>

      {/* Referees */}
      <View>
        <Text style={styles.sectionTitle}>Referees</Text>
        {resumeData.referees.map((referee, index) => (
          <View key={index}>
            <Text style={styles.text}>{referee.name}</Text>
            <Text style={styles.text}>{referee.position}</Text>
            <Text style={styles.text}>Organization: {referee.organization}</Text>
            <Text style={styles.text}>Mobile: {referee.mobile}</Text>
            <Text style={styles.text}>Email: {referee.email}</Text>
            <Text style={styles.line} /> {/* Line separator after each referee */}
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const ResumePage = () => (
  <div>
    <h1>Generate PDF Resume</h1>
    <PDFDownloadLink document={<ResumePDF />} fileName="resume.pdf">
      {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
    </PDFDownloadLink>
  </div>
);

export default ResumePage;