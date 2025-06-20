function openLinkedIn() {
    window.open("https://www.linkedin.com/in/arpita-bansal-583173323/", "_blank");
}

function openGitHub() {
    window.open("https://github.com/arpita-123-byte", "_blank");
}

function downloadResume() {
    const link = document.createElement('a');
    link.href = 'Arpita_Bansal_BMU.pdf'; 
    link.download = 'Arpita_Bansal_BMU.pdf';
    link.click();
}

