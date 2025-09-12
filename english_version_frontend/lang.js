 document.addEventListener('DOMContentLoaded', function() {
            const languageCards = document.querySelectorAll('.language-card');
            const acceptButton = document.querySelector('.accept-button');
            
            languageCards.forEach(card => {
                card.addEventListener('click', function() {
                    languageCards.forEach(c => c.style.borderColor = 'transparent');
                    this.style.borderColor = '#4caf50';
                });
            });
            
            acceptButton.addEventListener('click', function() {
                this.innerHTML = 'Processing...';
                this.disabled = true;
                
                setTimeout(() => {
                    alert('Language selected successfully!');
                    this.innerHTML = 'Accept';
                    this.disabled = false;
                }, 1500);
            });
        });