import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
function User() {

  const location = useLocation();
  const { email, name } = location.state || {};

  const stats = [
    { label: "Test Average", value: "53.48", color: "blue" },
    { label: "ODI Centuries", value: "46", color: "red" },
    { label: "Strike Rate", value: "93.62", color: "blue" },
    { label: "Highest Score", value: "254*", color: "red" },
    { label: "Run Rate", value: "5.94", color: "blue" },
    { label: "Win Rate", value: "72%", color: "red" }
  ];

  // Inline styles for different sections
  const styles = {
    userCard: {
      background: 'linear-gradient(135deg, #007bff, #dc3545)', // Darker blue and red
      width: '100%',
      maxWidth: '400px',
      margin: '30px auto',
      padding: '20px',
      borderRadius: '15px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    profileHeader: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    name: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#fff',
    },
    email: {
      color: '#f8f9fa', // Light text for email to contrast against darker background
      fontSize: '16px',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '15px',
    },
    statCard: {
      padding: '15px',
      borderLeft: '4px solid',
      borderRadius: '8px',
      backgroundColor: 'white',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    statLabel: {
      fontSize: '14px',
      color: '#666',
    },
    statValue: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#333',
    }
  };

  return (
    <>
      <Navbar/>
   
    <div style={styles.userCard}>
      <div style={styles.profileHeader}>
        <h2 style={styles.name}>{name}</h2>
        <p style={styles.email}>{email}</p>
      </div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              ...styles.statCard,
              borderLeftColor: stat.color === 'blue' ? '#007bff' : '#dc3545',
            }}
          >
            <div style={styles.statLabel}>{stat.label}</div>
            <div style={styles.statValue}>{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default User;
