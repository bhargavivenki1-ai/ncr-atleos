# View the Home Dashboard After Authentication

**Epic:** Secure Customer Authentication and App Navigation

**Description**

As a Bank Customer, I want to see a clear, accessible home dashboard
with four navigation tiles after I successfully log in, so that I can
easily access the main features of the app.

**Impacted Areas**

  --------------------------------------------------------------------------------------
  **No.**          **Page Name**    **Action**      **Explanation**
  ---------------- ---------------- --------------- ------------------------------------
  1                Banking App Home Create          This story creates the new dashboard
                   Screen                           screen to serve as the central
                                                    navigation hub after authentication.

  2                Application      Modify          Configure routing to display the
                   Navigation                       Banking App Home Screen as the
                                                    destination after a successful login
                                                    event.

  3                UI Theming       Integrate       The new Banking App Home Screen must
                   Engine                           be integrated with the theming
                                                    engine to apply the Light Theme.

                                                    

  Sl. No.          Name             Source          Data Type

  1                Banking App Home System          Screen/View
                   Screen                           

  2                Savings Tile     User Input      Button/Tile

  3                Cash Deposit     User Input      Button/Tile
                   Tile                             

  4                Balance Enquiry  User Input      Button/Tile
                   Tile                             

  5                Transfer Funds   User Input      Button/Tile
                   Tile                             

  6                Light Theme      System          Configuration

                                                    

  ID               AC               Subject         Content

  M-01             05               Application     We\'re sorry, we couldn\'t load the
                                    Error           application right now. Please try
                                                    again.

                                                    

  User             System                           

  User has just    System navigates                 
  successfully     the user to the                  
  authenticated    Banking App Home                 
  via the PIN      Screen. The                      
  screen.          screen loads in                  
                   under 2 seconds,                 
                   is rendered in                   
                   the Light Theme,                 
                   and displays the                 
                   \"Savings\",                     
                   \"Cash                           
                   Deposit\",                       
                   \"Balance                        
                   Enquiry\", and                   
                   \"Transfer                       
                   Funds\" tiles.                   

  Exception: User  The system                       
  has just         displays the                     
  successfully     Application                      
  authenticated,   Error message                    
  but an internal  (M-01).                          
  error occurs                                      
  while loading                                     
  the dashboard.                                    

                                                    

  Number           User             IDM             User Role
                   Classification   Authorization   

  1                Customer         Authenticated   Bank Customer
                                    Session         
  --------------------------------------------------------------------------------------

**Data Dictionary**

  -----------------------------------------------------------------------------------------------------------------------
  **Sl.   **Name**   **Source**   **Data Type**   **Field    **Is          **Business     **Error     **Test   **Page**
  No.**                                           Length**   Mandatory**   Rule**         Message**   Data**   
  ------- ---------- ------------ --------------- ---------- ------------- -------------- ----------- -------- ----------
  1       Banking    System       Screen/View     n/a        Yes           The main       n/a         n/a      Banking
          App Home                                                         dashboard                           App Home
          Screen                                                           screen. Must                        
                                                                           load in under                       
                                                                           2 seconds.                          

  2       Savings    User Input   Button/Tile     n/a        Yes           A navigation   n/a         n/a      Banking
          Tile                                                             control                             App Home
                                                                           labeled                             
                                                                           \"Savings\".                        

  3       Cash       User Input   Button/Tile     n/a        Yes           A navigation   n/a         n/a      Banking
          Deposit                                                          control                             App Home
          Tile                                                             labeled \"Cash                      
                                                                           Deposit\".                          

  4       Balance    User Input   Button/Tile     n/a        Yes           A navigation   n/a         n/a      Banking
          Enquiry                                                          control                             App Home
          Tile                                                             labeled                             
                                                                           \"Balance                           
                                                                           Enquiry\".                          

  5       Transfer   User Input   Button/Tile     n/a        Yes           A navigation   n/a         n/a      Banking
          Funds Tile                                                       control                             App Home
                                                                           labeled                             
                                                                           \"Transfer                          
                                                                           Funds\".                            

  6       Light      System       Configuration   n/a        Yes           The set of     n/a         n/a      Banking
          Theme                                                            visual styles                       App Home
                                                                           (colors,                            
                                                                           fonts) to be                        
                                                                           applied to the                      
                                                                           screen.                             
  -----------------------------------------------------------------------------------------------------------------------

**System Messages**

  -----------------------------------------------------------------------------------
  **ID**   **AC**   **Subject**   **Content**                            **Button**
  -------- -------- ------------- -------------------------------------- ------------
  M-01     05       Application   We\'re sorry, we couldn\'t load the    OK
                    Error         application right now. Please try      
                                  again.                                 

  -----------------------------------------------------------------------------------

**User Permissions**

  ---------------------------------------------------------------------------------------
  **Number**   **User             **IDM             **User      **Description**
               Classification**   Authorization**   Role**      
  ------------ ------------------ ----------------- ----------- -------------------------
  1            Customer           Authenticated     Bank        A standard customer who
                                  Session           Customer    has successfully
                                                                authenticated into the
                                                                mobile application and
                                                                has access to the main
                                                                dashboard.

  ---------------------------------------------------------------------------------------

**User Scenarios**

  -----------------------------------------------------------------------
  **User**                            **System**
  ----------------------------------- -----------------------------------
  User has just successfully          System navigates the user to the
  authenticated via the PIN screen.   Banking App Home Screen. The screen
                                      loads in under 2 seconds, is
                                      rendered in the Light Theme, and
                                      displays the \"Savings\", \"Cash
                                      Deposit\", \"Balance Enquiry\", and
                                      \"Transfer Funds\" tiles.

  Exception: User has just            The system displays the Application
  successfully authenticated, but an  Error message (M-01).
  internal error occurs while loading 
  the dashboard.                      
  -----------------------------------------------------------------------

**Acceptance Criteria**

1.  GIVEN I have successfully authenticated WHEN I am navigated to the
    home dashboard THEN the Banking App Home Screen is displayed
    containing four navigation tiles: Savings Tile, Cash Deposit Tile,
    Balance Enquiry Tile, and Transfer Funds Tile.

2.  GIVEN the Banking App Home Screen is displayed WHEN the screen is
    rendered THEN it must use the application\'s defined Light Theme.

3.  GIVEN I have successfully authenticated WHEN the Banking App Home
    Screen is displayed THEN it must be fully rendered and interactive
    in under 2 seconds over a standard mobile network connection.

4.  GIVEN the Banking App Home Screen is displayed WHEN its elements are
    inspected with an accessibility tool THEN all navigation tiles must
    have appropriate labels, a minimum touch target size of 44x44
    pixels, and meet WCAG 2.1 AA contrast requirements for the Light
    Theme.

5.  GIVEN I have successfully authenticated WHEN the application fails
    to render the Banking App Home Screen due to an internal error THEN
    the Application Error message (M-01) is displayed.

# E1-S6 --- Navigate to the Balance Enquiry Screen

**Epic:** Secure Customer Authentication and App Navigation

**Description**

As a Bank Customer, I want to tap the \"Balance Enquiry\" tile on the
home screen to navigate to the Balance Enquiry screen, so that I can
view my account balance and related options.

**Impacted Areas**

  ------------------------------------------------------------------------------------
  **No.**      **Page Name**    **Action**      **Explanation**
  ------------ ---------------- --------------- --------------------------------------
  1            Banking App Home Modify          Add navigation logic to the Balance
               Screen                           Enquiry Tile to route the user to the
                                                Balance Enquiry Screen.

  2            Balance Enquiry  Create          Create the new screen container and
               Screen                           basic layout, ensuring it is ready for
                                                subsequent feature development.

  3            Application      Modify          Configure the application\'s routing
               Navigation                       mechanism to handle the new navigation
                                                path from the Home screen to the
                                                Balance Enquiry screen.

  4            UI Theming       Integrate       The new Balance Enquiry Screen must be
               Engine                           integrated with the theming engine to
                                                apply the Light Theme.

                                                

  Sl. No.      Name             Source          Data Type

  1            Balance Enquiry  User Input      Button/Tile
               Tile                             

  2            Balance Enquiry  System          Screen/View
               Screen                           

  3            Light Theme      System          Configuration

  4            Banking App Home System          Screen/View
               Screen                           

                                                

  ID           AC               Subject         Content

  M-01         05               Navigation      We\'re sorry, we couldn\'t load that
                                Error           screen right now. Please try again.

                                                

  User         System                           

  User is on   System displays                  
  the Banking  the home screen                  
  App Home     with four tiles,                 
  Screen.      including the                    
               Balance Enquiry                  
               Tile.                            

  User taps    System navigates                 
  the Balance  the user to the                  
  Enquiry      Balance Enquiry                  
  Tile.        Screen, rendered                 
               in the Light                     
               Theme, within 2                  
               seconds.                         

  Exception:   System displays                  
  User taps    the \"Navigation                 
  the Balance  Error\" message                  
  Enquiry      (M-01) and the                   
  Tile, but a  user remains on                  
  navigation   the Banking App                  
  service      Home Screen.                     
  error                                         
  occurs.                                       

                                                

  Number       User             IDM             User Role
               Classification   Authorization   

  1            Customer         Authenticated   Bank Customer
                                Session         
  ------------------------------------------------------------------------------------

**Data Dictionary**

  ---------------------------------------------------------------------------------------------------------------------
  **Sl.   **Name**   **Source**   **Data Type**   **Field    **Is          **Business   **Error     **Test   **Page**
  No.**                                           Length**   Mandatory**   Rule**       Message**   Data**   
  ------- ---------- ------------ --------------- ---------- ------------- ------------ ----------- -------- ----------
  1       Balance    User Input   Button/Tile     n/a        Yes           Tapping this n/a         n/a      Banking
          Enquiry                                                          control                           App Home
          Tile                                                             initiates                         
                                                                           navigation                        
                                                                           to the                            
                                                                           Balance                           
                                                                           Enquiry                           
                                                                           Screen.                           

  2       Balance    System       Screen/View     n/a        Yes           Must be      n/a         n/a      Balance
          Enquiry                                                          rendered in                       Enquiry
          Screen                                                           the Light                         
                                                                           Theme and                         
                                                                           load in                           
                                                                           under 2                           
                                                                           seconds.                          

  3       Light      System       Configuration   n/a        Yes           The set of   n/a         n/a      Balance
          Theme                                                            visual                            Enquiry
                                                                           styles                            
                                                                           (colors,                          
                                                                           fonts) to be                      
                                                                           applied to                        
                                                                           the screen.                       

  4       Banking    System       Screen/View     n/a        Yes           The          n/a         n/a      Banking
          App Home                                                         dashboard                         App Home
          Screen                                                           screen                            
                                                                           containing                        
                                                                           the                               
                                                                           navigation                        
                                                                           tiles.                            
  ---------------------------------------------------------------------------------------------------------------------

**System Messages**

  -----------------------------------------------------------------------------------
  **ID**   **AC**   **Subject**   **Content**                            **Button**
  -------- -------- ------------- -------------------------------------- ------------
  M-01     05       Navigation    We\'re sorry, we couldn\'t load that   OK
                    Error         screen right now. Please try again.    

  -----------------------------------------------------------------------------------

**User Permissions**

  ---------------------------------------------------------------------------------------
  **Number**   **User             **IDM             **User      **Description**
               Classification**   Authorization**   Role**      
  ------------ ------------------ ----------------- ----------- -------------------------
  1            Customer           Authenticated     Bank        A standard customer who
                                  Session           Customer    has successfully
                                                                authenticated into the
                                                                mobile application and
                                                                has access to core
                                                                banking functions from
                                                                the home screen.

  ---------------------------------------------------------------------------------------

**User Scenarios**

  -----------------------------------------------------------------------
  **User**                            **System**
  ----------------------------------- -----------------------------------
  User is on the Banking App Home     System displays the home screen
  Screen.                             with four tiles, including the
                                      Balance Enquiry Tile.

  User taps the Balance Enquiry Tile. System navigates the user to the
                                      Balance Enquiry Screen, rendered in
                                      the Light Theme, within 2 seconds.

  Exception: User taps the Balance    System displays the \"Navigation
  Enquiry Tile, but a navigation      Error\" message (M-01) and the user
  service error occurs.               remains on the Banking App Home
                                      Screen.
  -----------------------------------------------------------------------

**Acceptance Criteria**

6.  GIVEN I am an authenticated Bank Customer on the Banking App Home
    Screen WHEN I tap the Balance Enquiry Tile THEN I am navigated to
    the Balance Enquiry Screen.

7.  GIVEN I have successfully navigated to the Balance Enquiry Screen
    WHEN the screen is rendered THEN it is displayed using the
    application\'s defined Light Theme.

8.  GIVEN I tap the Balance Enquiry Tile WHEN the system navigates to
    the Balance Enquiry Screen THEN the screen must finish loading and
    be interactive in under 2 seconds.

9.  GIVEN the Balance Enquiry Screen is displayed WHEN it is inspected
    with an accessibility tool THEN it must meet WCAG 2.1 AA standards
    for all standard UI elements, including text contrast and touch
    target sizes.

10. GIVEN I am on the Banking App Home Screen WHEN I tap the Balance
    Enquiry Tile and the navigation service fails THEN a user-friendly
    error message (M-01) is displayed, and I remain on the Banking App
    Home Screen.

# E1-S7 --- Navigate to the Transfer Funds Screen

**Epic:** Secure Customer Authentication and App Navigation

**Description**

As a Bank Customer, I want to tap the \"Transfer Funds\" tile on the
home screen to navigate to the Transfer Funds screen, so that I can
initiate a transfer between my accounts. The navigation must be
performant and the destination screen must be rendered in the
application\'s dark theme.

**Impacted Areas**

  ------------------------------------------------------------------------------------
  **No.**      **Page Name**    **Action**      **Explanation**
  ------------ ---------------- --------------- --------------------------------------
  1            Banking App Home Modify          Add navigation logic to the Transfer
               Screen                           Funds Tile to route the user to the
                                                Transfer Funds Screen.

  2            Transfer Funds   Create          Create the new screen container and
               Screen                           basic layout, ensuring it is ready for
                                                subsequent feature development.

  3            Application      Modify          Configure the application\'s routing
               Navigation                       mechanism to handle the new navigation
                                                path from the Home screen to the
                                                Transfer Funds screen.

  4            UI Theming       Integrate       The new Transfer Funds Screen must be
               Engine                           integrated with the theming engine to
                                                apply the Dark Theme.

                                                

  Sl. No.      Name             Source          Data Type

  1            Transfer Funds   User Input      Button/Tile
               Tile                             

  2            Transfer Funds   System          Screen/View
               Screen                           

  3            Dark Theme       System          Configuration

  4            Banking App Home System          Screen/View
               Screen                           

                                                

  ID           AC               Subject         Content

  M-01         05               Navigation      We\'re sorry, we couldn\'t load that
                                Error           screen right now. Please try again.

                                                

  User         System                           

  User is on   System displays                  
  the Banking  the home screen                  
  App Home     with four tiles,                 
  Screen.      including the                    
               Transfer Funds                   
               Tile.                            

  User taps    System navigates                 
  the Transfer the user to the                  
  Funds Tile.  Transfer Funds                   
               Screen, rendered                 
               in the Dark                      
               Theme, within 2                  
               seconds.                         

  Exception:   System displays                  
  User taps    the \"Navigation                 
  the Transfer Error\" message                  
  Funds Tile,  (M-01) and the                   
  but a        user remains on                  
  navigation   the Banking App                  
  service      Home Screen.                     
  error                                         
  occurs.                                       

                                                

  Number       User             IDM             User Role
               Classification   Authorization   

  1            Customer         Authenticated   Bank Customer
                                Session         
  ------------------------------------------------------------------------------------

**Data Dictionary**

  ---------------------------------------------------------------------------------------------------------------------
  **Sl.   **Name**   **Source**   **Data Type**   **Field    **Is          **Business   **Error     **Test   **Page**
  No.**                                           Length**   Mandatory**   Rule**       Message**   Data**   
  ------- ---------- ------------ --------------- ---------- ------------- ------------ ----------- -------- ----------
  1       Transfer   User Input   Button/Tile     n/a        Yes           Tapping this n/a         n/a      Banking
          Funds Tile                                                       control                           App Home
                                                                           initiates                         
                                                                           navigation                        
                                                                           to the                            
                                                                           Transfer                          
                                                                           Funds                             
                                                                           Screen.                           

  2       Transfer   System       Screen/View     n/a        Yes           Must be      n/a         n/a      Transfer
          Funds                                                            rendered in                       Funds
          Screen                                                           the Dark                          
                                                                           Theme and                         
                                                                           load in                           
                                                                           under 2                           
                                                                           seconds.                          

  3       Dark Theme System       Configuration   n/a        Yes           The set of   n/a         n/a      Transfer
                                                                           visual                            Funds
                                                                           styles                            
                                                                           (colors,                          
                                                                           fonts) to be                      
                                                                           applied to                        
                                                                           the screen.                       

  4       Banking    System       Screen/View     n/a        Yes           The          n/a         n/a      Banking
          App Home                                                         dashboard                         App Home
          Screen                                                           screen                            
                                                                           containing                        
                                                                           the                               
                                                                           navigation                        
                                                                           tiles.                            
  ---------------------------------------------------------------------------------------------------------------------

**System Messages**

  -----------------------------------------------------------------------------------
  **ID**   **AC**   **Subject**   **Content**                            **Button**
  -------- -------- ------------- -------------------------------------- ------------
  M-01     05       Navigation    We\'re sorry, we couldn\'t load that   OK
                    Error         screen right now. Please try again.    

  -----------------------------------------------------------------------------------

**User Permissions**

  ---------------------------------------------------------------------------------------
  **Number**   **User             **IDM             **User      **Description**
               Classification**   Authorization**   Role**      
  ------------ ------------------ ----------------- ----------- -------------------------
  1            Customer           Authenticated     Bank        A standard customer who
                                  Session           Customer    has successfully
                                                                authenticated into the
                                                                mobile application and
                                                                has access to core
                                                                banking functions from
                                                                the home screen.

  ---------------------------------------------------------------------------------------

**User Scenarios**

  -----------------------------------------------------------------------
  **User**                            **System**
  ----------------------------------- -----------------------------------
  User is on the Banking App Home     System displays the home screen
  Screen.                             with four tiles, including the
                                      Transfer Funds Tile.

  User taps the Transfer Funds Tile.  System navigates the user to the
                                      Transfer Funds Screen, rendered in
                                      the Dark Theme, within 2 seconds.

  Exception: User taps the Transfer   System displays the \"Navigation
  Funds Tile, but a navigation        Error\" message (M-01) and the user
  service error occurs.               remains on the Banking App Home
                                      Screen.
  -----------------------------------------------------------------------

**Acceptance Criteria**

11. GIVEN I am an authenticated Bank Customer on the Banking App Home
    Screen WHEN I tap the Transfer Funds Tile THEN I am navigated to the
    Transfer Funds Screen.

12. GIVEN I have successfully navigated to the Transfer Funds Screen
    WHEN the screen is rendered THEN it is displayed using the
    application\'s defined Dark Theme.

13. GIVEN I tap the Transfer Funds Tile WHEN the system navigates to the
    Transfer Funds Screen THEN the screen must finish loading and be
    interactive in under 2 seconds.

14. GIVEN the Transfer Funds Screen is displayed WHEN it is inspected
    with an accessibility tool THEN it must meet WCAG 2.1 AA standards
    for all standard UI elements, including text contrast and touch
    target sizes for the Dark Theme.

15. GIVEN I am on the Banking App Home Screen WHEN I tap the Transfer
    Funds Tile and the navigation service fails THEN a user-friendly
    error message (M-01) is displayed, and I remain on the Banking App
    Home Screen.

# E1-S8 --- Enabler: Integrate with the Customer Authentication Service

**Epic:** Secure Customer Authentication and App Navigation

**Description**

As a Development Team, we need to create a secure integration client for
the backend Authentication Service. This client will be responsible for
sending customer PINs for validation, processing success and failure
responses, and handling specific error conditions like account lockout,
thereby enabling the PIN Entry screen to perform its function.

**Impacted Areas**

  -------------------------------------------------------------------------------------
  **No.**      **Page Name**    **Action**       **Explanation**
  ------------ ---------------- ---------------- --------------------------------------
  1            Authentication   Integrate        This story creates the client-side
               Service                           code to securely connect and transact
                                                 with the backend Authentication
                                                 Service API.

  2            Application      Create           A new, reusable service client will be
               Service Layer                     created within the application to
                                                 encapsulate all logic for
                                                 communicating with the Authentication
                                                 Service.

  3            PIN Entry Screen Integrate        This screen will be the primary
                                                 consumer of the new service client.
                                                 The actual UI-to-client integration
                                                 will occur in a separate story.

                                                 

  Sl. No.      Name             Source           Data Type

  1            4-Digit PIN      System (from UI) String

  2            Authentication   System           JSON Object
               Request                           

  3            Authentication   Authentication   JSON Object
               Response         Service          

  4            Session Token    Authentication   String
                                Service          

  5            Failure Reason   Authentication   String
                                Service          

                                                 

  ID           AC               Subject          Content

  M-01         05               Service Timeout  Request to Authentication Service
                                (Internal Log)   timed out after 5 seconds.

  M-02         06               Server Error     Received HTTP 5xx error from
                                (Internal Log)   Authentication Service. Propagating
                                                 failure to UI layer.

                                                 

  User         System                            

  The PIN      The service                       
  Entry Screen client sends a                    
  module       secure HTTPS                      
  invokes the  request to the                    
  service      Authentication                    
  client with  Service.                          
  a correct                                      
  4-Digit PIN.                                   

  n/a          The                               
               Authentication                    
               Service returns                   
               a success                         
               response with a                   
               Session Token.                    

  n/a          The service                       
               client parses                     
               the response and                  
               returns a                         
               success object                    
               with the Session                  
               Token to the PIN                  
               Entry Screen                      
               module.                           

  Exception:   The service                       
  The PIN      client sends a                    
  Entry Screen secure HTTPS                      
  module       request to the                    
  invokes the  Authentication                    
  service      Service.                          
  client with                                    
  an incorrect                                   
  4-Digit PIN.                                   

  n/a          The                               
               Authentication                    
               Service returns                   
               a failure                         
               response with a                   
               reason of                         
               invalid_pin.                      

  n/a          The service                       
               client returns a                  
               failure object                    
               with the                          
               invalid_pin                       
               reason to the                     
               PIN Entry Screen                  
               module.                           

                                                 

  Number       User             IDM              User Role
               Classification   Authorization    

  1            System           Public Access    Bank Customer (Pre-Auth)
  -------------------------------------------------------------------------------------

**Data Dictionary**

  ------------------------------------------------------------------------------------------------------------------------------------
  **Sl.   **Name**         **Source**       **Data   **Field    **Is          **Business       **Error     **Test Data**    **Page**
  No.**                                     Type**   Length**   Mandatory**   Rule**           Message**                    
  ------- ---------------- ---------------- -------- ---------- ------------- ---------------- ----------- ---------------- ----------
  1       4-Digit PIN      System (from UI) String   4          Yes           A 4-digit        n/a         1234             n/a
                                                                              numeric value.                                
                                                                              Must be securely                              
                                                                              handled and                                   
                                                                              transmitted.                                  

  2       Authentication   System           JSON     n/a        Yes           The payload sent n/a         {\"pin\":        n/a
          Request                           Object                            to the                       \"1234\"}        
                                                                              Authentication                                
                                                                              Service,                                      
                                                                              containing the                                
                                                                              PIN.                                          

  3       Authentication   Authentication   JSON     n/a        Yes           The response     n/a         {\"status\":     n/a
          Response         Service          Object                            from the                     \"success\",     
                                                                              service,                     \"token\":       
                                                                              containing                   \"\...\"}        
                                                                              status and                                    
                                                                              either a token                                
                                                                              or an error                                   
                                                                              reason.                                       

  4       Session Token    Authentication   String   TBD        Yes           A secure token   n/a         eyJhbGciOi\...   n/a
                           Service                                            representing an                               
                                                                              authenticated                                 
                                                                              user session.                                 

  5       Failure Reason   Authentication   String   TBD        Yes           A code           n/a         invalid_pin,     n/a
                           Service                                            indicating the               account_locked   
                                                                              reason for                                    
                                                                              authentication                                
                                                                              failure.                                      
  ------------------------------------------------------------------------------------------------------------------------------------

**System Messages**

  -----------------------------------------------------------------------------------
  **ID**   **AC**   **Subject**   **Content**                            **Button**
  -------- -------- ------------- -------------------------------------- ------------
  M-01     05       Service       Request to Authentication Service      n/a
                    Timeout       timed out after 5 seconds.             
                    (Internal                                            
                    Log)                                                 

  M-02     06       Server Error  Received HTTP 5xx error from           n/a
                    (Internal     Authentication Service. Propagating    
                    Log)          failure to UI layer.                   
  -----------------------------------------------------------------------------------

**User Permissions**

  ----------------------------------------------------------------------------------------
  **Number**   **User             **IDM             **User       **Description**
               Classification**   Authorization**   Role**       
  ------------ ------------------ ----------------- ------------ -------------------------
  1            System             Public Access     Bank         The integration client
                                                    Customer     acts on behalf of an
                                                    (Pre-Auth)   unauthenticated user
                                                                 attempting to log in. The
                                                                 Authentication Service
                                                                 endpoint is publicly
                                                                 accessible but secured.

  ----------------------------------------------------------------------------------------

**User Scenarios**

  -----------------------------------------------------------------------
  **User**                            **System**
  ----------------------------------- -----------------------------------
  The PIN Entry Screen module invokes The service client sends a secure
  the service client with a correct   HTTPS request to the Authentication
  4-Digit PIN.                        Service.

  n/a                                 The Authentication Service returns
                                      a success response with a Session
                                      Token.

  n/a                                 The service client parses the
                                      response and returns a success
                                      object with the Session Token to
                                      the PIN Entry Screen module.

  Exception: The PIN Entry Screen     The service client sends a secure
  module invokes the service client   HTTPS request to the Authentication
  with an incorrect 4-Digit PIN.      Service.

  n/a                                 The Authentication Service returns
                                      a failure response with a reason of
                                      invalid_pin.

  n/a                                 The service client returns a
                                      failure object with the invalid_pin
                                      reason to the PIN Entry Screen
                                      module.
  -----------------------------------------------------------------------

**Acceptance Criteria**

16. GIVEN a valid 4-Digit PIN is provided by the calling module WHEN the
    integration client sends the PIN to the Authentication Service THEN
    the client correctly processes a success response (e.g., HTTP 200)
    and returns the received Session Token to the calling module.

17. GIVEN an incorrect 4-Digit PIN is provided WHEN the integration
    client sends the PIN to the Authentication Service THEN the client
    correctly processes a failure response (e.g., HTTP 401) with a
    reason of invalid_pin and returns this status to the calling module.

18. GIVEN an incorrect 4-Digit PIN is provided that exceeds the maximum
    allowed attempts (TBD) WHEN the integration client sends the PIN to
    the Authentication Service THEN the client correctly processes a
    failure response (e.g., HTTP 403) with a reason of account_locked
    and returns this status to the calling module.

19. GIVEN any request is sent to the Authentication Service WHEN the
    communication channel is established THEN the communication must
    occur over a secure, encrypted HTTPS channel.

20. GIVEN the Authentication Service is unavailable or does not respond
    within a 5-second timeout WHEN the integration client attempts to
    validate a PIN THEN the client must return a \'ServiceUnavailable\'
    error to the calling module and log message M-01.

21. GIVEN the Authentication Service returns an unexpected server-side
    error (e.g., HTTP 5xx) WHEN the integration client receives the
    response THEN the client must return a generic
    \'AuthenticationFailed\' error to the calling module and log message
    M-02.

# E2-S1 --- Navigate to the ATM Cash Withdrawal Screen

**Epic:** Mobile-Initiated ATM Cash Services

**Description**

As a Bank Customer, I want to navigate from the Banking App Home screen
to the ATM Cash Withdrawal screen by tapping the \"Savings\" tile, so
that I can access the interface to begin pre-staging a cash withdrawal
transaction. This navigation must be performant and the resulting screen
must be rendered correctly in the application\'s light theme.

**Impacted Areas**

  -------------------------------------------------------------------------------------
  **No.**       **Page Name**    **Action**      **Explanation**
  ------------- ---------------- --------------- --------------------------------------
  1             Banking App Home Modify          Add navigation logic to the
                Screen                           \"Savings\" tile to route the user to
                                                 the ATM Cash Withdrawal screen.

  2             ATM Cash         Create          Create the new screen container and
                Withdrawal                       basic layout, ensuring it is ready for
                Screen                           subsequent feature development.

  3             Application      Modify          Configure the application\'s routing
                Navigation                       mechanism to handle the new navigation
                                                 path from the Home screen to the
                                                 Withdrawal screen.

  4             UI Theming       Integrate       The new ATM Cash Withdrawal screen
                Engine                           must be integrated with the theming
                                                 engine to apply the light theme.

                                                 

  Sl. No.       Name             Source          Data Type

  1             Savings Tile     User Input      Button/Tile

  2             ATM Cash         System          Screen/View
                Withdrawal                       
                Screen                           

                                                 

  ID            AC               Subject         Content

  M-01          05               Navigation      We\'re sorry, we couldn\'t load that
                                 Error           screen right now. Please try again.

                                                 

  User          System                           

  User is on    System displays                  
  the Banking   the home screen                  
  App Home      with four tiles:                 
  screen.       \"Savings\",                     
                \"Cash                           
                Deposit\",                       
                \"Balance                        
                Enquiry\", and                   
                \"Transfer                       
                Funds\".                         

  User taps the System navigates                 
  \"Savings\"   the user to the                  
  tile.         ATM Cash                         
                Withdrawal                       
                screen, rendered                 
                in the light                     
                theme, within 2                  
                seconds.                         

  Exception:    System displays                  
  User taps the the \"Navigation                 
  \"Savings\"   Error\" message                  
  tile, but a   (M-01) and the                   
  service error user remains on                  
  occurs.       the Banking App                  
                Home screen.                     

                                                 

  Number        User             IDM             User Role
                Classification   Authorization   

  1             Customer         Authenticated   Bank Customer
                                 Session         
  -------------------------------------------------------------------------------------

**Data Dictionary**

  -----------------------------------------------------------------------------------------------------------------------
  **Sl.   **Name**     **Source**   **Data Type** **Field    **Is          **Business   **Error     **Test   **Page**
  No.**                                           Length**   Mandatory**   Rule**       Message**   Data**   
  ------- ------------ ------------ ------------- ---------- ------------- ------------ ----------- -------- ------------
  1       Savings Tile User Input   Button/Tile   n/a        Yes           Tapping this n/a         n/a      Banking App
                                                                           control                           Home
                                                                           initiates                         
                                                                           navigation                        
                                                                           to the ATM                        
                                                                           Cash                              
                                                                           Withdrawal                        
                                                                           screen.                           

  2       ATM Cash     System       Screen/View   n/a        Yes           Must be      n/a         n/a      ATM Cash
          Withdrawal                                                       rendered in                       Withdrawal
          Screen                                                           the light                         
                                                                           theme and                         
                                                                           load in                           
                                                                           under 2                           
                                                                           seconds.                          
  -----------------------------------------------------------------------------------------------------------------------

**System Messages**

  -----------------------------------------------------------------------------------
  **ID**   **AC**   **Subject**   **Content**                            **Button**
  -------- -------- ------------- -------------------------------------- ------------
  M-01     05       Navigation    We\'re sorry, we couldn\'t load that   OK
                    Error         screen right now. Please try again.    

  -----------------------------------------------------------------------------------

**User Permissions**

  ---------------------------------------------------------------------------------------
  **Number**   **User             **IDM             **User      **Description**
               Classification**   Authorization**   Role**      
  ------------ ------------------ ----------------- ----------- -------------------------
  1            Customer           Authenticated     Bank        A standard customer who
                                  Session           Customer    has successfully
                                                                authenticated into the
                                                                mobile application and
                                                                has access to core
                                                                banking functions.

  ---------------------------------------------------------------------------------------

**User Scenarios**

  -----------------------------------------------------------------------
  **User**                            **System**
  ----------------------------------- -----------------------------------
  User is on the Banking App Home     System displays the home screen
  screen.                             with four tiles: \"Savings\",
                                      \"Cash Deposit\", \"Balance
                                      Enquiry\", and \"Transfer Funds\".

  User taps the \"Savings\" tile.     System navigates the user to the
                                      ATM Cash Withdrawal screen,
                                      rendered in the light theme, within
                                      2 seconds.

  Exception: User taps the            System displays the \"Navigation
  \"Savings\" tile, but a service     Error\" message (M-01) and the user
  error occurs.                       remains on the Banking App Home
                                      screen.
  -----------------------------------------------------------------------

**Acceptance Criteria**

22. GIVEN I am an authenticated Bank Customer on the Banking App Home
    screen WHEN I tap the \"Savings\" tile THEN I am navigated to the
    ATM Cash Withdrawal screen.

23. GIVEN I have successfully navigated to the ATM Cash Withdrawal
    screen WHEN the screen is rendered THEN it is displayed using the
    application\'s defined light theme.

24. GIVEN I tap the \"Savings\" tile WHEN the system navigates to the
    ATM Cash Withdrawal screen THEN the screen must finish loading and
    be interactive in under 2 seconds.

25. GIVEN the ATM Cash Withdrawal screen is displayed WHEN it is
    inspected with an accessibility tool THEN it must meet WCAG 2.1 AA
    standards for all standard UI elements, including text contrast and
    touch target sizes.

26. GIVEN I am on the Banking App Home screen WHEN I tap the \"Savings\"
    tile and the navigation service fails THEN a user-friendly error
    message is displayed, and I remain on the Banking App Home screen.
