# Display the PIN Entry Screen on App Launch

**Epic:** Secure Customer Authentication and App Navigation

**Description**

As a Bank Customer, I want to be presented with a secure, accessible PIN
entry screen when I launch the app, so that I can begin the
authentication process. The screen must load quickly, adhere to
accessibility standards, and be rendered in the application\'s standard
light theme.

**Impacted Areas**

  --------------------------------------------------------------------------------------
  **No.**         **Page Name**     **Action**      **Explanation**
  --------------- ----------------- --------------- ------------------------------------
  1               PIN Entry Screen  Create          This story creates the new screen
                                                    for secure 4-digit PIN entry.

  2               Application Core  Modify          The application\'s startup sequence
                  / Router                          and routing must be configured to
                                                    set the PIN Entry Screen as the
                                                    initial view.

  3               UI Theming Engine Integrate       The new PIN Entry Screen must be
                                                    integrated with the theming engine
                                                    to apply the Light Theme.

                                                    

  Sl. No.         Name              Source          Data Type

  1               PIN Entry Screen  System          Screen/View

  2               4-Digit PIN       User Input      String

  3               Light Theme       System          Configuration

                                                    

  ID              AC                Subject         Content

  M-01            06                Application     The application could not be started
                                    Error           at this time. Please try again.

                                                    

  User            System                            

  User taps the   The system                        
  application     launches the                      
  icon to launch  application and,                  
  the app.        within 500ms,                     
                  displays the PIN                  
                  Entry Screen                      
                  rendered in the                   
                  Light Theme.                      

  Exception: User The system                        
  taps the        displays the                      
  application     Application Error                 
  icon, but an    message (M-01).                   
  unrecoverable                                     
  error occurs                                      
  during startup.                                   

                                                    

  Number          User              IDM             User Role
                  Classification    Authorization   

  1               Unauthenticated   Public Access   Bank Customer (Pre-Auth)
                  User                              
  --------------------------------------------------------------------------------------

**Data Dictionary**

  ---------------------------------------------------------------------------------------------------------------------
  **Sl.   **Name**   **Source**   **Data Type**   **Field    **Is          **Business   **Error     **Test   **Page**
  No.**                                           Length**   Mandatory**   Rule**       Message**   Data**   
  ------- ---------- ------------ --------------- ---------- ------------- ------------ ----------- -------- ----------
  1       PIN Entry  System       Screen/View     n/a        Yes           The          n/a         n/a      PIN Entry
          Screen                                                           container                         Screen
                                                                           for the PIN                       
                                                                           entry user                        
                                                                           interface.                        
                                                                           Must load in                      
                                                                           under 500ms.                      

  2       4-Digit    User Input   String          4          Yes           A field or   n/a         n/a      PIN Entry
          PIN                                                              set of                            Screen
                                                                           indicators                        
                                                                           to display                        
                                                                           the masked                        
                                                                           4-digit PIN                       
                                                                           as it is                          
                                                                           entered.                          

  3       Light      System       Configuration   n/a        Yes           The set of   n/a         n/a      PIN Entry
          Theme                                                            visual                            Screen
                                                                           styles                            
                                                                           (colors,                          
                                                                           fonts) to be                      
                                                                           applied to                        
                                                                           the screen.                       
  ---------------------------------------------------------------------------------------------------------------------

**System Messages**

  -----------------------------------------------------------------------------------
  **ID**   **AC**   **Subject**   **Content**                            **Button**
  -------- -------- ------------- -------------------------------------- ------------
  M-01     06       Application   The application could not be started   OK
                    Error         at this time. Please try again.        

  -----------------------------------------------------------------------------------

**User Permissions**

  ---------------------------------------------------------------------------------------
  **Number**   **User             **IDM             **User       **Description**
               Classification**   Authorization**   Role**       
  ------------ ------------------ ----------------- ------------ ------------------------
  1            Unauthenticated    Public Access     Bank         Any user who has
               User                                 Customer     launched the application
                                                    (Pre-Auth)   but has not yet
                                                                 successfully
                                                                 authenticated.

  ---------------------------------------------------------------------------------------

**User Scenarios**

  -----------------------------------------------------------------------
  **User**                            **System**
  ----------------------------------- -----------------------------------
  User taps the application icon to   The system launches the application
  launch the app.                     and, within 500ms, displays the PIN
                                      Entry Screen rendered in the Light
                                      Theme.

  Exception: User taps the            The system displays the Application
  application icon, but an            Error message (M-01).
  unrecoverable error occurs during   
  startup.                            
  -----------------------------------------------------------------------

**Acceptance Criteria**

1.  GIVEN a Bank Customer launches the application for the first time
    after installation or after a session has expired WHEN the
    application starts successfully THEN I am presented with the PIN
    Entry Screen.

2.  GIVEN the PIN Entry Screen is displayed WHEN the screen is rendered
    THEN it must use the application\'s defined Light Theme.

3.  GIVEN the PIN Entry Screen is displayed WHEN I view the screen THEN
    I see a user interface prompt for a 4-Digit PIN and the necessary
    controls for input.

4.  GIVEN a Bank Customer launches the application WHEN the PIN Entry
    Screen is displayed THEN it must be fully rendered and interactive
    in under 500ms on a standard mobile network connection.

5.  GIVEN the PIN Entry Screen is displayed WHEN its elements are
    inspected with an accessibility tool THEN all interactive elements
    must have a minimum touch target size of 44x44 pixels and all text
    and controls must meet WCAG 2.1 AA contrast ratio requirements for
    the Light Theme.

6.  GIVEN a Bank Customer launches the application WHEN the application
    fails to load the initial screen due to an internal error THEN a
    generic Application Error message (M-01) is displayed.

# E1-S2 --- Authenticate Successfully Using a Correct PIN

**Epic:** Secure Customer Authentication and App Navigation

**Description**

As a Bank Customer, I want to enter my correct 4-digit PIN to be
securely authenticated and gain access to the Banking App Home screen,
so that I can begin my banking session. The authentication process must
be performant, secure, and navigate to the home screen upon success.

**Impacted Areas**

  ----------------------------------------------------------------------------------------
  **No.**          **Page Name**     **Action**       **Explanation**
  ---------------- ----------------- ---------------- ------------------------------------
  1                PIN Entry Screen  Modify           Add submission logic to validate the
                                                      entered PIN against the
                                                      Authentication Service.

  2                Authentication    Integrate        The PIN Entry Screen will send the
                   Service                            entered PIN to this service for
                                                      validation and to receive a session
                                                      token.

  3                Banking App Home  Integrate        The application will navigate to
                   Screen                             this screen upon successful
                                                      authentication.

  4                Application       Modify           Implement routing from the PIN
                   Navigation                         screen to the Home screen and manage
                                                      the navigation back stack to prevent
                                                      returning to the PIN screen after
                                                      login.

                                                      

  Sl. No.          Name              Source           Data Type

  1                4-Digit PIN       User Input       String

  2                Authentication    Authentication   JSON Object
                   Response          Service          

  3                Session Token     Authentication   String
                                     Service          

  4                PIN Entry Screen  System           Screen/View

  5                Banking App Home  System           Screen/View
                   Screen                             

                                                      

  ID               AC                Subject          Content

  M-01             04                Authentication   We could not log you in at this
                                     Failed           time. Please try again later.

                                                      

  User             System                             

  User is on the   System displays                    
  PIN Entry        the interface for                  
  Screen.          PIN entry.                         

  User enters      System sends the                   
  their correct    PIN securely to                    
  4-Digit PIN.     the                                
                   Authentication                     
                   Service.                           

  n/a              The                                
                   Authentication                     
                   Service validates                  
                   the PIN and                        
                   returns a success                  
                   response with a                    
                   Session Token.                     

  n/a              System navigates                   
                   the user to the                    
                   Banking App Home                   
                   Screen, which                      
                   loads in under 2                   
                   seconds.                           

  Exception: User  System sends the                   
  enters their     PIN, but the                       
  correct 4-Digit  request fails.                     
  PIN, but the     The                                
  Authentication   Authentication                     
  Service is down. Failed message                     
                   (M-01) is                          
                   displayed. The                     
                   user remains on                    
                   the PIN Entry                      
                   Screen.                            

                                                      

  Number           User              IDM              User Role
                   Classification    Authorization    

  1                Unauthenticated   Public Access    Bank Customer (Pre-Auth)
                   User                               
  ----------------------------------------------------------------------------------------

**Data Dictionary**

  ---------------------------------------------------------------------------------------------------------------------------------------------
  **Sl.   **Name**         **Source**       **Data Type** **Field    **Is          **Business Rule** **Error     **Test Data**       **Page**
  No.**                                                   Length**   Mandatory**                     Message**                       
  ------- ---------------- ---------------- ------------- ---------- ------------- ----------------- ----------- ------------------- ----------
  1       4-Digit PIN      User Input       String        4          Yes           Must be a 4-digit n/a         1234                PIN Entry
                                                                                   numeric value.                                    Screen
                                                                                   This story                                        
                                                                                   handles the                                       
                                                                                   correct PIN case.                                 

  2       Authentication   Authentication   JSON Object   n/a        Yes           Contains success  n/a         {\"status\":        n/a
          Response         Service                                                 status and                    \"success\",        
                                                                                   session token.                \"sessionToken\":   
                                                                                                                 \"\...\"}           

  3       Session Token    Authentication   String        TBD        Yes           A secure token    n/a         eyJhbGciOi\...      n/a
                           Service                                                 representing the                                  
                                                                                   authenticated                                     
                                                                                   user session.                                     

  4       PIN Entry Screen System           Screen/View   n/a        Yes           The UI for        n/a         n/a                 PIN Entry
                                                                                   entering the                                      Screen
                                                                                   4-Digit PIN.                                      

  5       Banking App Home System           Screen/View   n/a        Yes           The main          n/a         n/a                 Banking
          Screen                                                                   dashboard                                         App Home
                                                                                   displayed after                                   Screen
                                                                                   successful                                        
                                                                                   authentication.                                   
  ---------------------------------------------------------------------------------------------------------------------------------------------

**System Messages**

  --------------------------------------------------------------------------------------
  **ID**   **AC**   **Subject**      **Content**                            **Button**
  -------- -------- ---------------- -------------------------------------- ------------
  M-01     04       Authentication   We could not log you in at this time.  OK
                    Failed           Please try again later.                

  --------------------------------------------------------------------------------------

**User Permissions**

  ---------------------------------------------------------------------------------------
  **Number**   **User             **IDM             **User       **Description**
               Classification**   Authorization**   Role**       
  ------------ ------------------ ----------------- ------------ ------------------------
  1            Unauthenticated    Public Access     Bank         Any user on the PIN
               User                                 Customer     Entry Screen who has not
                                                    (Pre-Auth)   yet successfully
                                                                 authenticated. This is
                                                                 the role that performs
                                                                 the action in this
                                                                 story.

  ---------------------------------------------------------------------------------------

**User Scenarios**

  -----------------------------------------------------------------------
  **User**                            **System**
  ----------------------------------- -----------------------------------
  User is on the PIN Entry Screen.    System displays the interface for
                                      PIN entry.

  User enters their correct 4-Digit   System sends the PIN securely to
  PIN.                                the Authentication Service.

  n/a                                 The Authentication Service
                                      validates the PIN and returns a
                                      success response with a Session
                                      Token.

  n/a                                 System navigates the user to the
                                      Banking App Home Screen, which
                                      loads in under 2 seconds.

  Exception: User enters their        System sends the PIN, but the
  correct 4-Digit PIN, but the        request fails. The Authentication
  Authentication Service is down.     Failed message (M-01) is displayed.
                                      The user remains on the PIN Entry
                                      Screen.
  -----------------------------------------------------------------------

**Acceptance Criteria**

7.  GIVEN I am on the PIN Entry Screen and have entered my correct
    4-Digit PIN WHEN I submit the PIN for validation THEN I am
    successfully authenticated and navigated to the Banking App Home
    Screen.

8.  GIVEN I have submitted my correct 4-Digit PIN WHEN the system
    authenticates and navigates THEN the Banking App Home Screen must be
    fully rendered and interactive in under 2 seconds.

9.  GIVEN I submit my 4-Digit PIN WHEN the PIN is transmitted to the
    Authentication Service THEN the communication must occur over a
    secure, encrypted channel.

10. GIVEN I have submitted my correct 4-Digit PIN WHEN the
    Authentication Service is unavailable or returns a system error THEN
    the Authentication Failed error message (M-01) is displayed, and I
    remain on the PIN Entry Screen.

11. GIVEN I have successfully authenticated and am on the Banking App
    Home Screen WHEN I use the device\'s back navigation action THEN the
    application exits or returns to the device\'s home screen, and the
    PIN Entry Screen is not displayed.

# E1-S3 --- Receive Feedback for an Incorrect PIN Entry

**Epic:** Secure Customer Authentication and App Navigation

**Description**

As a Bank Customer, I want to be notified with an error message when I
enter an incorrect PIN, so that I understand my login attempt failed and
can try again. The feedback must be clear, immediate, and secure, and
the input field must be reset for a subsequent attempt.

**Impacted Areas**

  ----------------------------------------------------------------------------------------
  **No.**          **Page Name**     **Action**       **Explanation**
  ---------------- ----------------- ---------------- ------------------------------------
  1                PIN Entry Screen  Modify           Add logic to display an error
                                                      message and clear the PIN field upon
                                                      receiving a failure response from
                                                      the Authentication Service.

  2                Authentication    Integrate        The PIN Entry Screen will receive a
                   Service                            failure response from this service
                                                      when an incorrect PIN is submitted.

  3                UI Component      Modify           The standard error message component
                   Library                            must be used to display feedback,
                                                      ensuring it is accessible and
                                                      theme-compliant.

                                                      

  Sl. No.          Name              Source           Data Type

  1                4-Digit PIN       User Input       String

  2                Authentication    Authentication   JSON Object
                   Response          Service          

  3                PIN Entry Screen  System           Screen/View

                                                      

  ID               AC                Subject          Content

  M-01             01                Incorrect PIN    The PIN you entered is incorrect.
                                                      Please try again.

  M-02             05                Authentication   We could not log you in at this
                                     Failed           time. Please try again later.

                                                      

  User             System                             

  User is on the   System displays                    
  PIN Entry        the interface for                  
  Screen.          PIN entry.                         

  User enters an   System sends the                   
  incorrect        PIN securely to                    
  4-Digit PIN      the                                
  (e.g., 9876).    Authentication                     
                   Service.                           

  n/a              The                                
                   Authentication                     
                   Service validates                  
                   the PIN and                        
                   returns a failure                  
                   response.                          

  n/a              System displays                    
                   the Incorrect PIN                  
                   error message                      
                   (M-01), clears                     
                   the 4-Digit PIN                    
                   field, and the                     
                   user remains on                    
                   the PIN Entry                      
                   Screen.                            

  Exception: User  System sends the                   
  enters an        PIN, but the                       
  incorrect        request fails.                     
  4-Digit PIN, but The                                
  the              Authentication                     
  Authentication   Failed error                       
  Service is       message (M-02) is                  
  unavailable.     displayed. The                     
                   user remains on                    
                   the PIN Entry                      
                   Screen.                            

                                                      

  Number           User              IDM              User Role
                   Classification    Authorization    

  1                Unauthenticated   Public Access    Bank Customer (Pre-Auth)
                   User                               
  ----------------------------------------------------------------------------------------

**Data Dictionary**

  ---------------------------------------------------------------------------------------------------------------------------------------
  **Sl.   **Name**         **Source**       **Data Type** **Field    **Is          **Business   **Error     **Test Data**      **Page**
  No.**                                                   Length**   Mandatory**   Rule**       Message**                      
  ------- ---------------- ---------------- ------------- ---------- ------------- ------------ ----------- ------------------ ----------
  1       4-Digit PIN      User Input       String        4          Yes           A 4-digit    n/a         9876               PIN Entry
                                                                                   numeric                                     Screen
                                                                                   value. This                                 
                                                                                   story                                       
                                                                                   handles the                                 
                                                                                   incorrect                                   
                                                                                   PIN case.                                   

  2       Authentication   Authentication   JSON Object   n/a        Yes           Contains     n/a         {\"status\":       n/a
          Response         Service                                                 failure                  \"failure\",       
                                                                                   status and               \"reason\":        
                                                                                   reason.                  \"invalid_pin\"}   

  3       PIN Entry Screen System           Screen/View   n/a        Yes           The UI for   n/a         n/a                PIN Entry
                                                                                   entering the                                Screen
                                                                                   4-Digit PIN.                                
  ---------------------------------------------------------------------------------------------------------------------------------------

**System Messages**

  --------------------------------------------------------------------------------------
  **ID**   **AC**   **Subject**      **Content**                            **Button**
  -------- -------- ---------------- -------------------------------------- ------------
  M-01     01       Incorrect PIN    The PIN you entered is incorrect.      OK
                                     Please try again.                      

  M-02     05       Authentication   We could not log you in at this time.  OK
                    Failed           Please try again later.                
  --------------------------------------------------------------------------------------

**User Permissions**

  ---------------------------------------------------------------------------------------
  **Number**   **User             **IDM             **User       **Description**
               Classification**   Authorization**   Role**       
  ------------ ------------------ ----------------- ------------ ------------------------
  1            Unauthenticated    Public Access     Bank         Any user on the PIN
               User                                 Customer     Entry Screen who has not
                                                    (Pre-Auth)   yet successfully
                                                                 authenticated. This is
                                                                 the role that performs
                                                                 the action in this
                                                                 story.

  ---------------------------------------------------------------------------------------

**User Scenarios**

  -----------------------------------------------------------------------
  **User**                            **System**
  ----------------------------------- -----------------------------------
  User is on the PIN Entry Screen.    System displays the interface for
                                      PIN entry.

  User enters an incorrect 4-Digit    System sends the PIN securely to
  PIN (e.g., 9876).                   the Authentication Service.

  n/a                                 The Authentication Service
                                      validates the PIN and returns a
                                      failure response.

  n/a                                 System displays the Incorrect PIN
                                      error message (M-01), clears the
                                      4-Digit PIN field, and the user
                                      remains on the PIN Entry Screen.

  Exception: User enters an incorrect System sends the PIN, but the
  4-Digit PIN, but the Authentication request fails. The Authentication
  Service is unavailable.             Failed error message (M-02) is
                                      displayed. The user remains on the
                                      PIN Entry Screen.
  -----------------------------------------------------------------------

**Acceptance Criteria**

12. GIVEN I am on the PIN Entry Screen and have entered an incorrect
    4-Digit PIN WHEN I submit the PIN for validation THEN the Incorrect
    PIN error message (M-01) is displayed, the 4-Digit PIN entry field
    is cleared, and I remain on the PIN Entry Screen.

13. GIVEN I have submitted an incorrect 4-Digit PIN WHEN the system
    validates the PIN and displays the error THEN the error message must
    be displayed and the PIN field cleared in under 1 second.

14. GIVEN the Incorrect PIN error message (M-01) is displayed WHEN the
    screen is inspected with an accessibility tool THEN the error
    message text must be programmatically associated with the PIN entry
    field and meet WCAG 2.1 AA contrast requirements for the light
    theme.

15. GIVEN I submit an incorrect 4-Digit PIN WHEN the PIN is transmitted
    to the Authentication Service THEN the communication must occur over
    a secure, encrypted channel.

16. GIVEN the Authentication Service is unavailable when an incorrect
    PIN is submitted WHEN the system attempts to validate the PIN THEN
    the Authentication Failed error message (M-02) is displayed, and I
    remain on the PIN Entry Screen.

# E1-S4 --- Temporarily Lock Account After Maximum Failed PIN Attempts

**Epic:** Secure Customer Authentication and App Navigation

**Description**

As a Bank Customer, I want the system to temporarily lock my account
after a set number of consecutive incorrect PIN entries, so that my
account is protected from unauthorized access via brute-force attacks.
The system must display a clear message with instructions on how to
proceed once the account is locked.

**Impacted Areas**

  --------------------------------------------------------------------------------------
  **No.**      **Page Name**     **Action**       **Explanation**
  ------------ ----------------- ---------------- --------------------------------------
  1            PIN Entry Screen  Modify           Add logic to track failed attempts,
                                                  display the account locked message,
                                                  and disable the PIN input field upon
                                                  reaching the threshold.

  2            Authentication    Modify           Add logic to track the Failed Attempt
               Service                            Count per user, enforce the account
                                                  lock, and expose the lock status.

  3            Application State Modify           The client-side state needs to manage
               Management                         the Failed Attempt Count during a
                                                  session to trigger the UI changes.

                                                  

  Sl. No.      Name              Source           Data Type

  1            4-Digit PIN       User Input       String

  2            Failed Attempt    Authentication   Integer
               Count             Service          

  3            Max Failed        System           Integer
               Attempts          Configuration    

  4            Account Lock      Authentication   String
               Status            Service          

  5            PIN Entry Screen  System           Screen/View

  6            Banking App Home  System           Screen/View
               Screen                             

                                                  

  ID           AC                Subject          Content

  M-01         01                Account Locked   For your security, your account has
                                                  been temporarily locked after too many
                                                  incorrect attempts. Please contact
                                                  support at TBD.

                                                  

  User         System                             

  User is on   System displays                    
  the PIN      the standard                       
  Entry Screen \"Incorrect PIN\"                  
  and has      error message.                     
  already                                         
  entered an                                      
  incorrect                                       
  PIN twice                                       
  (Failed                                         
  Attempt                                         
  Count = 2,                                      
  Max Failed                                      
  Attempts =                                      
  3).                                             

  User enters  System sends the                   
  a third      PIN to the                         
  incorrect    Authentication                     
  4-Digit PIN. Service, which                     
               confirms the                       
               third failure.                     

  n/a          The                                
               Authentication                     
               Service updates                    
               the Account Lock                   
               Status to                          
               \'Locked\' and                     
               returns a                          
               \'locked\'                         
               response.                          

  n/a          The PIN Entry                      
               Screen displays                    
               the Account                        
               Locked message                     
               (M-01) and                         
               disables the                       
               4-Digit PIN entry                  
               field.                             

  Exception:   System sends the                   
  User has     PIN to the                         
  entered an   Authentication                     
  incorrect    Service, which                     
  PIN twice.   validates it                       
  On the third successfully. The                  
  attempt,     service resets                     
  they enter   the Failed                         
  the correct  Attempt Count to                   
  PIN.         0. The user is                     
               navigated to the                   
               Banking App Home                   
               Screen.                            

                                                  

  Number       User              IDM              User Role
               Classification    Authorization    

  1            Unauthenticated   Public Access    Bank Customer (Pre-Auth)
               User                               
  --------------------------------------------------------------------------------------

**Data Dictionary**

  ----------------------------------------------------------------------------------------------------------------------------
  **Sl.   **Name**   **Source**       **Data Type** **Field    **Is          **Business Rule** **Error     **Test   **Page**
  No.**                                             Length**   Mandatory**                     Message**   Data**   
  ------- ---------- ---------------- ------------- ---------- ------------- ----------------- ----------- -------- ----------
  1       4-Digit    User Input       String        4          Yes           A 4-digit numeric n/a         1234     PIN Entry
          PIN                                                                value. This story                      Screen
                                                                             handles the case                       
                                                                             where it is                            
                                                                             entered                                
                                                                             incorrectly                            
                                                                             multiple times.                        

  2       Failed     Authentication   Integer       n/a        Yes           A server-side     n/a         2        n/a
          Attempt    Service                                                 counter for                            
          Count                                                              consecutive                            
                                                                             incorrect PIN                          
                                                                             entries for a                          
                                                                             user account.                          
                                                                             Resets on                              
                                                                             successful login.                      

  3       Max Failed System           Integer       n/a        Yes           The configurable  n/a         3        n/a
          Attempts   Configuration                                           threshold for                          
                                                                             incorrect                              
                                                                             attempts before                        
                                                                             an account is                          
                                                                             locked. Value is                       
                                                                             TBD.                                   

  4       Account    Authentication   String        n/a        Yes           The status of the n/a         Locked   n/a
          Lock       Service                                                 user\'s account                        
          Status                                                             (e.g.,                                 
                                                                             \'Active\',                            
                                                                             \'Locked\').                           

  5       PIN Entry  System           Screen/View   n/a        Yes           The UI for        n/a         n/a      PIN Entry
          Screen                                                             entering the                           Screen
                                                                             4-Digit PIN.                           

  6       Banking    System           Screen/View   n/a        Yes           The destination   n/a         n/a      Banking
          App Home                                                           screen upon                            App Home
          Screen                                                             successful                             
                                                                             authentication.                        
  ----------------------------------------------------------------------------------------------------------------------------

**System Messages**

  -----------------------------------------------------------------------------------
  **ID**   **AC**   **Subject**   **Content**                            **Button**
  -------- -------- ------------- -------------------------------------- ------------
  M-01     01       Account       For your security, your account has    OK
                    Locked        been temporarily locked after too many 
                                  incorrect attempts. Please contact     
                                  support at TBD.                        

  -----------------------------------------------------------------------------------

**User Permissions**

  ---------------------------------------------------------------------------------------
  **Number**   **User             **IDM             **User       **Description**
               Classification**   Authorization**   Role**       
  ------------ ------------------ ----------------- ------------ ------------------------
  1            Unauthenticated    Public Access     Bank         Any user on the PIN
               User                                 Customer     Entry Screen who has not
                                                    (Pre-Auth)   yet successfully
                                                                 authenticated. This
                                                                 role\'s actions trigger
                                                                 the account lock.

  ---------------------------------------------------------------------------------------

**User Scenarios**

  -----------------------------------------------------------------------
  **User**                            **System**
  ----------------------------------- -----------------------------------
  User is on the PIN Entry Screen and System displays the standard
  has already entered an incorrect    \"Incorrect PIN\" error message.
  PIN twice (Failed Attempt Count =   
  2, Max Failed Attempts = 3).        

  User enters a third incorrect       System sends the PIN to the
  4-Digit PIN.                        Authentication Service, which
                                      confirms the third failure.

  n/a                                 The Authentication Service updates
                                      the Account Lock Status to
                                      \'Locked\' and returns a \'locked\'
                                      response.

  n/a                                 The PIN Entry Screen displays the
                                      Account Locked message (M-01) and
                                      disables the 4-Digit PIN entry
                                      field.

  Exception: User has entered an      System sends the PIN to the
  incorrect PIN twice. On the third   Authentication Service, which
  attempt, they enter the correct     validates it successfully. The
  PIN.                                service resets the Failed Attempt
                                      Count to 0. The user is navigated
                                      to the Banking App Home Screen.
  -----------------------------------------------------------------------

**Acceptance Criteria**

17. GIVEN I am on the PIN Entry Screen and have made Max Failed
    Attempts - 1 consecutive incorrect PIN entries WHEN I enter another
    incorrect 4-Digit PIN THEN the Account Locked message (M-01) is
    displayed, the 4-Digit PIN entry field is disabled, and I remain on
    the PIN Entry Screen.

18. GIVEN my account is in a locked state and the Account Locked message
    (M-01) is displayed WHEN I attempt to interact with the 4-Digit PIN
    entry field THEN the field remains disabled and no input is
    accepted.

19. GIVEN I am on the PIN Entry Screen and have made fewer than Max
    Failed Attempts consecutive incorrect PIN entries WHEN I enter my
    correct 4-Digit PIN THEN I am successfully authenticated, the
    internal Failed Attempt Count is reset to zero, and I am navigated
    to the Banking App Home Screen.

20. GIVEN an account lock is triggered on the client WHEN the
    Authentication Service is notified of the final failed attempt THEN
    the service must update the user\'s Account Lock Status to
    \'Locked\' on the backend.

21. GIVEN the Account Locked message (M-01) is displayed WHEN the screen
    is inspected with an accessibility tool THEN the message text must
    be readable and meet WCAG 2.1 AA contrast requirements for the light
    theme.
