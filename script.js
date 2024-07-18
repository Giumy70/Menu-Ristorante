document.addEventListener('DOMContentLoaded', () => {
    let totale = 0;
    const portateSelezionate = new Set();

    // Simula il contenuto del file JSON
    const menuData = [
        { nome: "Pizza Margherita", prezzo: 8.50, disponibile: true, foto: "margherita.jpg" },
        { nome: "Pasta al Pomodoro", prezzo: 9.00, disponibile: true, foto: "pasta.jpg" },
        { nome: "Insalata Mista", prezzo: 6.50, disponibile: true, foto: "insalata.jpg" },
    ];
    const menuContainer = document.getElementById('menu-container');
    menuData.forEach(item => {
        if (item.disponibile) {
            const itemElement = document.createElement('div');
            itemElement.classList.add('menu-item');
            itemElement.innerHTML = `
                <img src="https://via.placeholder.com/100" alt="${item.nome}">
                <div class="menu-item-details">
                    <h2>${item.nome}</h2>
                    <p>Prezzo: €${item.prezzo.toFixed(2)}</p>
                </div>
            `;
            itemElement.addEventListener('click', () => toggleSelection(item, itemElement));
            menuContainer.appendChild(itemElement);
        }
    });
    function toggleSelection(item, element) {
        if (portateSelezionate.has(item)) {
            portateSelezionate.delete(item);
            element.classList.remove('selected');
            totale -= item.prezzo;
        } else {
            portateSelezionate.add(item);
            element.classList.add('selected');
            totale += item.prezzo;
        }
        updateTotale();
     }
  function updateTotale() {
        document.getElementById('totale').textContent = `Totale: €${totale.toFixed(2)}`;
    }

    document.getElementById('genera-qr').addEventListener('click', generaQRCode);

    function generaQRCode() {
        const ordineString = Array.from(portateSelezionate)
            .map(item => `${item.nome}: €${item.prezzo.toFixed(2)}`)
            .join('\n');
        const qrText = `Ordine:\n${ordineString}\n\nTotale: €${totale.toFixed(2)}`;

        const qrcodeContainer = document.getElementById('qrcode');
        qrcodeContainer.innerHTML = '';

        new QRCode(qrcodeContainer, {
            text: qrText,
            width: 256,
            height: 256
        });
    }
});
