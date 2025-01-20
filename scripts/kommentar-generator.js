// Funktion zum Generieren des Kommentars
function kommentarErstellen() {
    // Eingaben auslesen
    const eingabeText = document.getElementById("eingabeText").value;
    const sprache = document.querySelector('input[name="sprache"]:checked').value;
    const trenner = document.getElementById("trenner").value;
    const laenge = parseInt(document.getElementById("laenge").value);

    let kommentarAnfang;
    let kommentarEnde;

    // Sprache definieren
    if (sprache === "<!-- -->") { // HTML
        kommentarAnfang = "<!-- ";
        kommentarEnde = " -->";
    } else if (sprache === "/* */") { // CSS
        kommentarAnfang = "/* ";
        kommentarEnde = " */";
    } else { // PHP, JavaScript
        kommentarAnfang = "// ";
        kommentarEnde = "";
    }

    // Kommentar
    // Eingabetext und Trennerlänge berechnen
    const text = eingabeText ? ` ${eingabeText} ` : " "; // Leerzeichen für Trenner
    const platzFuerText = laenge - (kommentarAnfang.length + kommentarEnde.length);  // Platz für Text im Kommentar

    // Länge der Trennlinie
    // Trennerlänge = (Gesamtlänge - Länge des Kommentars) / 2
    const trennlinieLaenge = Math.max(0, Math.floor((platzFuerText - text.length) / 2));

    // Trennlinie generieren
    const trennlinie = trenner.repeat(Math.ceil(trennlinieLaenge / trenner.length)).slice(0, trennlinieLaenge); // Trennlinie

    // Kommentar generieren
    const kommentar = `${kommentarAnfang}${trennlinie}${text.trim() ? text : ""}${trennlinie}${kommentarEnde}`.trim(); // Kommentar mit Text

    //Trennlinie ohne Leerzeichen, falls kein Text eingegeben wurde
    const kompletterTrenner = trenner.repeat(Math.ceil(platzFuerText / trenner.length)).slice(0, platzFuerText);

    // Ausgabe
    const ausgabe = eingabeText ? kommentar : `${kommentarAnfang}${kompletterTrenner}${kommentarEnde}`;

    // Ausgabe im HTML-Element anzeigen
    document.getElementById("ausgabeFeld").innerText = ausgabe;
}

function inZwischenanlage() {
    const ausgabeText = document.getElementById("ausgabeFeld").innerText; // Text aus dem Ausgabefeld holen
    navigator.clipboard.writeText(ausgabeText).then(function () { // Text in die Zwischenablage kopieren
        alert("Kommentar wurde kopiert!");
    });
}

// Event-Listener
document.getElementById("kopierenButton").addEventListener("click", inZwischenanlage); // Event-Listener für Kopieren-Button
document.getElementById("erstellenButton").addEventListener("click", kommentarErstellen); // Event-Listener für Generieren-Button