document.addEventListener('DOMContentLoaded', () => {
    const uploadInput = document.getElementById('art-upload');
    const heroSection = document.getElementById('hero');
    const analysisSection = document.getElementById('analysis-view');
    const resultSection = document.getElementById('result-view');
    const paymentSection = document.getElementById('payment-view');
    const processingSection = document.getElementById('payment-processing');
    const successSection = document.getElementById('payment-success');
    const previewImage = document.getElementById('preview-image');
    const terminalText = document.getElementById('terminal-text');
    const proceedPaymentBtn = document.getElementById('proceed-payment-btn');
    const paymentForm = document.getElementById('payment-form');
    const resetBtn = document.getElementById('reset-btn');

    // Form inputs
    const cardNumberInput = document.getElementById('card-number');
    const expiryInput = document.getElementById('expiry');
    const cvcInput = document.getElementById('cvc');

    // Persona Data
    const analysisSteps = [
        "Calibrating Quantum Sensors...",
        "Deconvolving Brushstroke Spectral Data...",
        "Cross-referencing 19th Century Pigment Database...",
        "Consulting the Ghost of Vollard...",
        "Collapsing Wave Function..."
    ];

    const verdicts = {
        authentic: {
            title: "AUTHENTIC",
            color: "#d4af37", // Gold
            comments: [
                "Magnificent. The spectral signature matches the 1890s pigment composition perfectly. My quantum tensors weep at its beauty.",
                "A true masterpiece. The hesitation in the brushwork is human, but the soul is divine. Confirmed by 400 qubits.",
                "I haven't seen such light since I sat with Monet in Giverny. The probability of forgery is 0.0000001%."
            ]
        },
        fake: {
            title: "FORGERY",
            color: "#ff4444", // Red
            comments: [
                "Disappointing. The titanium white pigment detected did not exist until 1921. A clumsy attempt.",
                "The hand is steady, but the soul is absent. My neural networks detect a 99% match with modern synthetic resin.",
                "I refuse to sell this. The quantum interference pattern suggests a machine-made replica. Burn it."
            ]
        }
    };

    // Event Listeners
    uploadInput.addEventListener('change', handleUpload);
    proceedPaymentBtn.addEventListener('click', showPayment);
    paymentForm.addEventListener('submit', handlePayment);
    resetBtn.addEventListener('click', resetApp);

    // Card input formatting
    cardNumberInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
    });

    expiryInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    });

    cvcInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
    });

    function handleUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        // Show Image
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImage.src = e.target.result;
            startAnalysis();
        };
        reader.readAsDataURL(file);
    }

    function startAnalysis() {
        // Transition UI
        heroSection.classList.add('hidden');
        analysisSection.classList.remove('hidden');

        // Simulate Steps
        let stepIndex = 0;
        const interval = setInterval(() => {
            if (stepIndex < analysisSteps.length) {
                terminalText.innerText = `> ${analysisSteps[stepIndex]}`;
                // Add glitch effect
                terminalText.style.opacity = Math.random() > 0.5 ? 1 : 0.5;
                stepIndex++;
            } else {
                clearInterval(interval);
                showResult();
            }
        }, 800);
    }

    function showResult() {
        analysisSection.classList.add('hidden');
        resultSection.classList.remove('hidden');

        // Randomize Verdict (Simulation)
        const isAuthentic = Math.random() > 0.5;
        const data = isAuthentic ? verdicts.authentic : verdicts.fake;
        const randomComment = data.comments[Math.floor(Math.random() * data.comments.length)];
        const confidence = (95 + Math.random() * 4.9).toFixed(2);

        // Update UI
        const titleEl = document.getElementById('verdict-title');
        const descEl = document.getElementById('verdict-desc');
        const scoreEl = document.getElementById('confidence-score');

        titleEl.innerText = data.title;
        titleEl.style.color = data.color;
        descEl.innerText = `"${randomComment}"`;
        scoreEl.innerText = `${confidence}% Q-Certainty`;
    }

    function showPayment() {
        resultSection.classList.add('hidden');
        paymentSection.classList.remove('hidden');
    }

    function handlePayment(e) {
        e.preventDefault();

        // Show processing
        paymentSection.classList.add('hidden');
        processingSection.classList.remove('hidden');

        // Simulate payment processing
        setTimeout(() => {
            processingSection.classList.add('hidden');
            showSuccess();
        }, 2500);
    }

    function showSuccess() {
        // Generate transaction ID
        const timestamp = Date.now().toString().slice(-6);
        const transactionId = `QV-2025-${timestamp}`;
        document.getElementById('transaction-id').innerText = transactionId;

        successSection.classList.remove('hidden');
    }

    function resetApp() {
        // Hide all sections
        resultSection.classList.add('hidden');
        paymentSection.classList.add('hidden');
        processingSection.classList.add('hidden');
        successSection.classList.add('hidden');

        // Show hero
        heroSection.classList.remove('hidden');

        // Clear inputs
        uploadInput.value = '';
        previewImage.src = '';
        paymentForm.reset();
    }
});
