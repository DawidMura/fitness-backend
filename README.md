# fitness-backend
## Schritten (& schritten) für User
1. User registriert sich 
   * firstName, lastName, etc.
   * User-Eingaben werden zuerst validiert
   * Daten werden in database gespeicher 
2. User loggt sich ein
    * email, password
    * Server erzeugt ein Token
    * server gibt den User ein Token zurück, damit er seine Daten bearbeiten kann, oder auch er Kurse bzw. 
      Geräten auswählen kann. 
## Schritten (& schritten) für Backend
  1. Implementierung von Collections:Menber, Courses, Devices, Userinfo (Mongoose)
  2. Validierung aller Collections ( Express-Validator)
  3. Implementierung der Controllers für aller Models
  4. anlegen der Routen
  5. Speichern der Daten in Database 
