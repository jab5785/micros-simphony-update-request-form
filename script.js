document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('updateRequestForm');
    const successMessage = document.getElementById('successMessage');
    
    // Handle location dropdown change
    const locationSelect = document.getElementById('location');
    const otherLocationGroup = document.getElementById('otherLocationGroup');
    
    locationSelect.addEventListener('change', function() {
        if (this.value === 'Other') {
            otherLocationGroup.style.display = 'block';
            document.getElementById('otherLocation').required = true;
        } else {
            otherLocationGroup.style.display = 'none';
            document.getElementById('otherLocation').required = false;
        }
    });
    
    // Handle "Other" request type checkbox
    const otherRequestCheckbox = document.getElementById('otherRequest');
    const otherRequestGroup = document.getElementById('otherRequestGroup');
    
    otherRequestCheckbox.addEventListener('change', function() {
        if (this.checked) {
            otherRequestGroup.style.display = 'block';
            document.getElementById('otherRequestText').required = true;
        } else {
            otherRequestGroup.style.display = 'none';
            document.getElementById('otherRequestText').required = false;
        }
    });
    
    // Form validation
    function validateForm() {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        // Clear previous error states
        document.querySelectorAll('.form-group.error').forEach(group => {
            group.classList.remove('error');
        });
        
        // Check required fields
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                const formGroup = field.closest('.form-group');
                if (formGroup) {
                    formGroup.classList.add('error');
                }
                isValid = false;
            }
        });
        
        // Validate at least one request type is selected
        const requestTypeCheckboxes = document.querySelectorAll('input[name="requestType"]:checked');
        if (requestTypeCheckboxes.length === 0) {
            const requestTypeGroup = document.querySelector('input[name="requestType"]').closest('.form-group');
            requestTypeGroup.classList.add('error');
            isValid = false;
        }
        
        // Validate at least one justification is selected
        const justificationCheckboxes = document.querySelectorAll('input[name="justification"]:checked');
        if (justificationCheckboxes.length === 0) {
            const justificationGroup = document.querySelector('input[name="justification"]').closest('.form-group');
            justificationGroup.classList.add('error');
            isValid = false;
        }
        
        // Validate email format
        const emailField = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField.value && !emailRegex.test(emailField.value)) {
            const emailGroup = emailField.closest('.form-group');
            emailGroup.classList.add('error');
            isValid = false;
        }
        
        // Validate price fields are positive numbers
        const currentPrice = document.getElementById('currentPrice');
        const newPrice = document.getElementById('newPrice');
        
        if (currentPrice.value && parseFloat(currentPrice.value) < 0) {
            currentPrice.closest('.form-group').classList.add('error');
            isValid = false;
        }
        
        if (newPrice.value && parseFloat(newPrice.value) < 0) {
            newPrice.closest('.form-group').classList.add('error');
            isValid = false;
        }
        
        return isValid;
    }
    
// Initialize EmailJS
(function(){
    emailjs.init('CbpTXWipOKZ05NTe0'); // CbpTXWipOKZ05NTe0
})();

// Handle form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        // Scroll to first error
        const firstError = document.querySelector('.form-group.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
    submitButton.classList.add('loading');
    
    // Collect form data
    const formData = new FormData(form);
    
    // Prepare email parameters
    const emailParams = {
        fullName: formData.get('fullName'),
        department: formData.get('department'),
        email: formData.get('email'),
        location: formData.get('location') === 'Other' ? formData.get('otherLocation') : formData.get('location'),
        requestType: formData.getAll('requestType').join(', '),
        otherRequestType: formData.get('otherRequestText') || 'N/A',
        itemName: formData.get('itemName'),
        itemCode: formData.get('itemCode') || 'N/A',
        currentPrice: formData.get('currentPrice'),
        newPrice: formData.get('newPrice'),
        rvcAffected: formData.get('rvcAffected'),
        reasonForChange: formData.get('reasonForChange'),
        justification: formData.getAll('justification').join(', '),
        additionalNotes: formData.get('additionalNotes') || 'N/A'
    };
    
    // Send email using EmailJS
    emailjs.send('CbpTXWipOKZ05NTe0', 'YOUR_TEMPLATE_ID', emailParams)
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        // Show success message
        form.style.display = 'none';
        successMessage.style.display = 'block';
    }, function(error) {
        console.log('FAILED...', error);
        alert('Failed to send the request. Please try again later.');
    })
    .finally(() => {
        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        submitButton.classList.remove('loading');
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            const formGroup = this.closest('.form-group');
            if (this.hasAttribute('required') && !this.value.trim()) {
                formGroup.classList.add('error');
            } else {
                formGroup.classList.remove('error');
            }
        });
        
        input.addEventListener('input', function() {
            const formGroup = this.closest('.form-group');
            if (formGroup.classList.contains('error') && this.value.trim()) {
                formGroup.classList.remove('error');
            }
        });
    });
    
    // File upload handling
    const fileInput = document.getElementById('supportingDocument');
    fileInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            // Validate file size (10MB limit)
            const maxSize = 10 * 1024 * 1024; // 10MB in bytes
            if (file.size > maxSize) {
                alert('File size must be less than 10MB. Please choose a smaller file.');
                this.value = '';
                return;
            }
            
            // Validate file type
            const allowedTypes = [
                'application/pdf',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/vnd.ms-excel',
                'image/jpeg',
                'image/jpg',
                'image/png',
                'image/gif'
            ];
            
            if (!allowedTypes.includes(file.type)) {
                alert('Please upload a valid file type: PDF, Excel, or Image files only.');
                this.value = '';
                return;
            }
            
            console.log('File selected:', file.name, 'Size:', (file.size / 1024 / 1024).toFixed(2) + 'MB');
        }
    });
});

// Global functions
function resetForm() {
    if (confirm('Are you sure you want to clear all form data? This action cannot be undone.')) {
        document.getElementById('updateRequestForm').reset();
        
        // Hide conditional fields
        document.getElementById('otherLocationGroup').style.display = 'none';
        document.getElementById('otherRequestGroup').style.display = 'none';
        
        // Clear error states
        document.querySelectorAll('.form-group.error').forEach(group => {
            group.classList.remove('error');
        });
        
        // Reset required attributes
        document.getElementById('otherLocation').required = false;
        document.getElementById('otherRequestText').required = false;
    }
}

function submitAnother() {
    // Hide success message and show form again
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('updateRequestForm').style.display = 'block';
    
    // Reset the form
    resetForm();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add form progress indicator
function updateProgress() {
    const requiredFields = document.querySelectorAll('[required]');
    const filledFields = Array.from(requiredFields).filter(field => field.value.trim() !== '');
    const progress = (filledFields.length / requiredFields.length) * 100;
    
    // You can add a progress bar here if needed
    console.log('Form completion:', Math.round(progress) + '%');
}

// Monitor form completion
document.addEventListener('input', updateProgress);
document.addEventListener('change', updateProgress);
