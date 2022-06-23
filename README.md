# fitness-backend
# Schritten (& schritten)
1. User registriert sich 
   * firtsName, lastName, etc. 
2. User loggt sich ein
    * email, password
3. User Daten werden validiert und auf  dem Server  gespeichgert, dabei wird ein Token erzeugt
   * Token: ye6nn...
4. server schickt den User den Token
  
5. User speichert den Token als Cookie im Browser
6. User kann Daten bzw. Post zurückbekommen, beim gültigen Token (verification)
   