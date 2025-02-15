document.addEventListener('DOMContentLoaded', () => {
    // Show initial toast message
    const initialToast = document.getElementById('initialToast');
    if (initialToast) {
        initialToast.classList.add('show');
        setTimeout(() => {
            initialToast.classList.remove('show');
        }, 4000); // Show for 4 seconds
    }

    // Show modal when question mark is clicked
    document.querySelector('.help-icon').addEventListener('click', showModal);

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('helpModal');
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
});

function make(){
	let result = "// Tool By Aaron_Gamer - Github\n";
	let is_dowbl = false;
	let input_text = document.forms.fm.input.value;
	
	for(let i = 0; i < input_text.length; i++){
		let input_text_slice = input_text.slice(i, 1+i);
		if(input_text_slice == '"') {
			if(!is_dowbl) is_dowbl = true;
			else if(is_dowbl) is_dowbl = false;
			result = result + '"';
			continue;
		}
		if(is_dowbl){
			let slice_result = input_text_slice.codePointAt(0);
			slice_result = (('0000' + slice_result.toString(16).toUpperCase()).substr(-4));
			slice_result = "\\u" + slice_result;
			result = result + slice_result;
		}
		else {
			result = result + input_text_slice;
		}
	}
	document.forms.fm.output.value = result;
}

function copy() {
    let outputField = document.querySelector('.output-section textarea');
    
    // Only proceed if there's text to copy
    if(outputField && outputField.value.trim() !== "") {
        // Select the text
        outputField.select();
        outputField.setSelectionRange(0, 99999); // For mobile devices
        
        try {
            // Try to use the modern clipboard API
            navigator.clipboard.writeText(outputField.value).then(() => {
                // Show success message
                const copyText = document.getElementById('copy_text');
                const copyButton = document.getElementById('convert');
                
                // Visual feedback
                copyText.style.color = '#4CAF50';
                copyText.innerText = '✓ Copied successfully!';
                copyButton.value = 'Copied!';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    copyText.style.color = '#4a90e2';
                    copyText.innerText = '↓ Copy and use the text below';
                    copyButton.value = 'Copy';
                }, 2000);
            });
        } catch (err) {
            // Fallback for older browsers
            document.execCommand('copy');
            
            // Show success message
            const copyText = document.getElementById('copy_text');
            const copyButton = document.getElementById('convert');
            
            copyText.style.color = '#4CAF50';
            copyText.innerText = '✓ Copied successfully!';
            copyButton.value = 'Copied!';
            
            setTimeout(() => {
                copyText.style.color = '#4a90e2';
                copyText.innerText = '↓ Copy and use the text below';
                copyButton.value = 'Copy';
            }, 2000);
        }
    }
}

(function($){
    $(function(){
        var bpX = 0;
        var bpY = 0;
        setInterval(function(){
            bpX += 0;
            bpY += +0.5;
            $('body').css('background-position', bpX+'px '+bpY+'px')
        })
    });
})(jQuery);

function showModal() {
    const modal = document.getElementById('helpModal');
    modal.classList.add('show');
}

function closeModal() {
    const modal = document.getElementById('helpModal');
    modal.classList.remove('show');
}

try {
    let fileInput = document.getElementById("file_input");
    fileInput.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            // Check if file is JSON
            if (!file.name.toLowerCase().endsWith('.json')) {
                alert('Please select a JSON file');
                this.value = ''; // Clear the file input
                return;
            }
            
            const reader = new FileReader();
            
            // When file is loaded, copy to clipboard and update textarea
            reader.onload = function(e) {
                const fileContent = e.target.result;
                
                // Copy to clipboard
                navigator.clipboard.writeText(fileContent).then(() => {
                    // Update the input textarea
                    document.getElementById('input').value = fileContent;
                    
                    // Show visual feedback
                    const copyText = document.getElementById('copy_text');
                    copyText.style.color = '#4CAF50';
                    copyText.innerText = '✓ File content copied to clipboard!';
                    
                    // Reset message after 2 seconds
                    setTimeout(() => {
                        copyText.style.color = '#4a90e2';
                        copyText.innerText = '↓ Copy and use the text below';
                    }, 2000);
                }).catch(err => {
                    console.log('Failed to copy to clipboard:', err);
                });
            };
            
            // Read the file as text
            reader.readAsText(file);
        }
    };
} catch(e) {
    console.log(e.message);
}