document.getElementById("fetch-btn").addEventListener("click", async () => {
    const ifscCode = document.getElementById("ifsc-code").value.trim();
    const errorMessage = document.getElementById("error-message");
    const ifscInfoTable = document.getElementById("ifsc-info");

    // Clear previous error messages and table content
    errorMessage.textContent = '';
    ifscInfoTable.classList.add("hidden");

    if (!ifscCode) {
        errorMessage.textContent = "Please enter an IFSC code.";
        return;
    }

    try {
        const response = await fetch(`https://ifsc.razorpay.com/${ifscCode}`);

        if (!response.ok) {
            throw new Error("IFSC code not found or invalid.");
        }

        const data = await response.json();
        
        // Display the result in the table
        const tableBody = ifscInfoTable.querySelector("tbody");
        tableBody.innerHTML = `
            <tr>
                <td>${data.BANK}</td>
                <td>${data.BRANCH}</td>
                <td>${data.ADDRESS}</td>
                <td>${data.CITY}</td>
                <td>${data.STATE}</td>
                <td>${data.IFSC}</td>
            </tr>
        `;
        
        // Show the table
        ifscInfoTable.classList.remove("hidden");
    } catch (error) {
        errorMessage.textContent = error.message;
    }
});
