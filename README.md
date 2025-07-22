
Built by https://www.blackbox.ai

---

```markdown
# Micros/Simphony Update Request Form

## Project Overview
The Micros/Simphony Update Request Form is a web application designed to facilitate the submission of item or price change requests for Micros/Simphony systems. This form allows users to provide detailed information regarding their requests, which will be reviewed and approved before implementation. The application is built using HTML, CSS, and JavaScript, and leverages EmailJS for sending email notifications upon form submission.

## Installation
To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/micros-simphony-update-form.git
   cd micros-simphony-update-form
   ```

2. **Open the `index.html` file in your browser** to view the form.

   Alternatively, you can use a local server (like Live Server) to serve the files, which is recommended for better performance.

## Usage
Fill out the form fields as follows:

1. **Requestor Details**: Enter your full name, department, email address, and select your ship/location.
   
2. **Request Type**: Check all applicable request types, and specify if there's any other request.

3. **Item Information**: Provide details such as item name, item code (if any), current price, new price, affected RVCs, and the reason for the change.

4. **Justification**: Justify your request by selecting the relevant justifications and adding any additional notes.

5. **File Upload**: Optionally, upload supporting documents.

6. Click the **Submit Request** button to send your request. A confirmation message will be displayed upon successful submission.

## Features
- Responsive design suitable for desktop and mobile devices.
- Form validation to ensure all required fields are completed correctly before submission.
- Ability to upload supporting documents.
- Sends email notifications using EmailJS upon form submission.
- Clear form functionality to reset the form fields.
- User-friendly layout with sections for different categories of information.

## Dependencies
This project utilizes the following technologies:
- **EmailJS**: For sending emails upon form submission (loaded via CDN).
- No additional dependencies specified in a package manager.

## Project Structure
The project contains the following files:

```
/micros-simphony-update-form
│
├── index.html       # The main HTML file for the form
├── styles.css       # CSS styles for the form layout and design
└── script.js        # JavaScript file for form validation and submission logic
```

### File Descriptions
- **index.html**: The markup for the form, including sections for user input and submission.
- **styles.css**: Styles applied to the HTML elements, ensuring a clean and user-friendly interface.
- **script.js**: JavaScript functions for handling form behavior, validations, and interactions with EmailJS.

## License
This project is open-source and available under the MIT License. Feel free to modify and use it according to your needs!
```

This README provides a clear and comprehensive overview of the project, installation instructions, usage guidelines, features, dependencies, and project structure, making it easy for users and developers to understand and work with the Micros/Simphony Update Request Form application.