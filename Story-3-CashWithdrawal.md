# Select an Amount to Stage a Cash Withdrawal

**Epic:** Mobile-Initiated ATM Cash Services

**Description**

As a Bank Customer on the ATM Cash Withdrawal screen, I want to select a
predefined withdrawal amount and submit my request, so that the
transaction is staged with the ATM Staging Service for later completion
at a physical ATM.

**Impacted Areas**

  --------------------------------------------------------------------------------------
  **No.**        **Page Name**    **Action**      **Explanation**
  -------------- ---------------- --------------- --------------------------------------
  1              ATM Cash         Modify          Add amount selection buttons (\$20,
                 Withdrawal                       \$100), a \"Stage Withdrawal\" button,
                 Screen                           and the associated validation and
                                                  submission logic.

  2              ATM Staging      Integrate       The \"Stage Withdrawal\" action will
                 Service                          trigger an encrypted API call to this
                                                  backend service to stage the
                                                  transaction.

  3              Application      Modify          Configure routing from the ATM Cash
                 Navigation                       Withdrawal screen to the TBD:
                                                  Withdrawal Confirmation Screen upon
                                                  successful transaction staging.

                                                  

  Sl. No.        Name             Source          Data Type

  1              \$20 Amount      User Input      Button
                 Button                           

  2              \$100 Amount     User Input      Button
                 Button                           

  3              Stage Withdrawal User Input      Button
                 Button                           

  4              Selected Amount  System          Decimal

                                                  

  ID             AC               Subject         Content

  M-01           03               Amount Required Please select a withdrawal amount
                                                  before proceeding.

  M-02           04               Staging Failed  We were unable to stage your
                                                  withdrawal at this time. Please try
                                                  again.

                                                  

  User           System                           

  User is on the System displays                  
  ATM Cash       amount selection                 
  Withdrawal     buttons for                      
  screen. Card   \"\$20\" and                     
  details are    \"\$100\", and a                 
  already        \"Stage                          
  entered.       Withdrawal\"                     
                 button.                          

  User taps the  The \"\$100\"                    
  \"\$100\"      button appears                   
  amount button. visually                         
                 selected.                        

  User taps the  System sends the                 
  \"Stage        request to the                   
  Withdrawal\"   ATM Staging                      
  button.        Service and                      
                 navigates the                    
                 user to the TBD:                 
                 Withdrawal                       
                 Confirmation                     
                 Screen within 3                  
                 seconds.                         

  Exception:     System displays                  
  User taps the  the \"Amount                     
  \"Stage        Required\" error                 
  Withdrawal\"   message (M-01).                  
  button without The user remains                 
  selecting an   on the ATM Cash                  
  amount.        Withdrawal                       
                 screen.                          

                                                  

  Number         User             IDM             User Role
                 Classification   Authorization   

  1              Customer         Authenticated   Bank Customer
                                  Session         
  --------------------------------------------------------------------------------------

**Data Dictionary**

  -----------------------------------------------------------------------------------------------------------------------
  **Sl.   **Name**     **Source**   **Data    **Field    **Is          **Business     **Error       **Test   **Page**
  No.**                             Type**    Length**   Mandatory**   Rule**         Message**     Data**   
  ------- ------------ ------------ --------- ---------- ------------- -------------- ------------- -------- ------------
  1       \$20 Amount  User Input   Button    n/a        Yes           Selects a      n/a           n/a      ATM Cash
          Button                                                       withdrawal                            Withdrawal
                                                                       amount of                             
                                                                       \$20. Only one                        
                                                                       amount can be                         
                                                                       selected at a                         
                                                                       time.                                 

  2       \$100 Amount User Input   Button    n/a        Yes           Selects a      n/a           n/a      ATM Cash
          Button                                                       withdrawal                            Withdrawal
                                                                       amount of                             
                                                                       \$100. Only                           
                                                                       one amount can                        
                                                                       be selected at                        
                                                                       a time.                               

  3       Stage        User Input   Button    n/a        Yes           Submits the    n/a           n/a      ATM Cash
          Withdrawal                                                   staged                                Withdrawal
          Button                                                       withdrawal                            
                                                                       request for                           
                                                                       processing by                         
                                                                       the ATM                               
                                                                       Staging                               
                                                                       Service.                              

  4       Selected     System       Decimal   n/a        Yes           Must be        Please select 20.00    ATM Cash
          Amount                                                       selected       a withdrawal           Withdrawal
                                                                       before the     amount before          
                                                                       \"Stage        proceeding.            
                                                                       Withdrawal\"                          
                                                                       button is                             
                                                                       tapped. Valid                         
                                                                       values are                            
                                                                       20.00, 100.00.                        
  -----------------------------------------------------------------------------------------------------------------------

**System Messages**

  -----------------------------------------------------------------------------------
  **ID**   **AC**   **Subject**   **Content**                            **Button**
  -------- -------- ------------- -------------------------------------- ------------
  M-01     03       Amount        Please select a withdrawal amount      OK
                    Required      before proceeding.                     

  M-02     04       Staging       We were unable to stage your           OK
                    Failed        withdrawal at this time. Please try    
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
                                                                has access to core
                                                                banking functions.

  ---------------------------------------------------------------------------------------

**User Scenarios**

  -----------------------------------------------------------------------
  **User**                            **System**
  ----------------------------------- -----------------------------------
  User is on the ATM Cash Withdrawal  System displays amount selection
  screen. Card details are already    buttons for \"\$20\" and \"\$100\",
  entered.                            and a \"Stage Withdrawal\" button.

  User taps the \"\$100\" amount      The \"\$100\" button appears
  button.                             visually selected.

  User taps the \"Stage Withdrawal\"  System sends the request to the ATM
  button.                             Staging Service and navigates the
                                      user to the TBD: Withdrawal
                                      Confirmation Screen within 3
                                      seconds.

  Exception: User taps the \"Stage    System displays the \"Amount
  Withdrawal\" button without         Required\" error message (M-01).
  selecting an amount.                The user remains on the ATM Cash
                                      Withdrawal screen.
  -----------------------------------------------------------------------

**Acceptance Criteria**

1.  GIVEN I am a Bank Customer on the ATM Cash Withdrawal screen with
    valid card details entered WHEN I select the \"\$20\" amount button
    and tap the \"Stage Withdrawal\" button THEN the system initiates a
    request to the ATM Staging Service and, upon success, navigates me
    to the TBD: Withdrawal Confirmation Screen.

2.  GIVEN I am a Bank Customer on the ATM Cash Withdrawal screen with
    valid card details entered WHEN I select the \"\$100\" amount button
    and tap the \"Stage Withdrawal\" button THEN the system initiates a
    request to the ATM Staging Service and, upon success, navigates me
    to the TBD: Withdrawal Confirmation Screen.

3.  GIVEN I am a Bank Customer on the ATM Cash Withdrawal screen WHEN I
    tap the \"Stage Withdrawal\" button without having selected an
    amount THEN the system displays the \"Amount Required\" error
    message (M-01) and I remain on the ATM Cash Withdrawal screen.

4.  GIVEN I have selected a valid amount and tapped the \"Stage
    Withdrawal\" button WHEN the ATM Staging Service is unavailable or
    returns an error THEN the system displays the \"Staging Failed\"
    error message (M-02) and I remain on the ATM Cash Withdrawal screen.

5.  GIVEN I have tapped the \"Stage Withdrawal\" button WHEN the system
    processes the request THEN a response (success or failure) must be
    displayed to me in under 3 seconds.

6.  GIVEN the amount selection buttons (\"\$20\", \"\$100\") and the
    \"Stage Withdrawal\" button are displayed WHEN they are inspected
    with an accessibility tool THEN they must have a minimum touch
    target size of 44x44 pixels and meet WCAG 2.1 AA contrast ratio
    requirements for the light theme.

# E2-S3 --- Access the Cash Deposit Screen

**Epic:** Mobile-Initiated ATM Cash Services

**Description**

As a Bank Customer on the Banking App Home screen, I want to tap the
\"Cash Deposit\" tile and navigate to the Cash Deposit screen, so that I
can access the interface to begin pre-staging a cash deposit
transaction. This navigation must be performant and the resulting screen
must be rendered correctly in the application\'s dark theme.

**Impacted Areas**

  ------------------------------------------------------------------------------------
  **No.**      **Page Name**    **Action**      **Explanation**
  ------------ ---------------- --------------- --------------------------------------
  1            Banking App Home Modify          Add navigation logic to the \"Cash
               Screen                           Deposit\" tile to route the user to
                                                the Cash Deposit screen.

  2            Cash Deposit     Create          Create the new screen container and
               Screen                           basic layout, ensuring it is ready for
                                                subsequent feature development.

  3            Application      Modify          Configure the application\'s routing
               Navigation                       mechanism to handle the new navigation
                                                path from the Home screen to the
                                                Deposit screen.

  4            UI Theming       Integrate       The new Cash Deposit screen must be
               Engine                           integrated with the theming engine to
                                                apply the dark theme.

                                                

  Sl. No.      Name             Source          Data Type

  1            Cash Deposit     User Input      Button/Tile
               Tile                             

  2            Cash Deposit     System          Screen/View
               Screen                           

                                                

  ID           AC               Subject         Content

  M-01         05               Navigation      We\'re sorry, we couldn\'t load that
                                Error           screen right now. Please try again.

                                                

  User         System                           

  User is on   System displays                  
  the Banking  the home screen                  
  App Home     with four tiles:                 
  screen.      \"Savings\",                     
               \"Cash                           
               Deposit\",                       
               \"Balance                        
               Enquiry\", and                   
               \"Transfer                       
               Funds\".                         

  User taps    System navigates                 
  the \"Cash   the user to the                  
  Deposit\"    Cash Deposit                     
  tile.        screen, rendered                 
               in the dark                      
               theme, within 2                  
               seconds.                         

  Exception:   System displays                  
  User taps    the \"Navigation                 
  the \"Cash   Error\" message                  
  Deposit\"    (M-01) and the                   
  tile, but a  user remains on                  
  service      the Banking App                  
  error        Home screen.                     
  occurs.                                       

                                                

  Number       User             IDM             User Role
               Classification   Authorization   

  1            Customer         Authenticated   Bank Customer
                                Session         
  ------------------------------------------------------------------------------------

**Data Dictionary**

  -------------------------------------------------------------------------------------------------------------------
  **Sl.   **Name**   **Source**   **Data Type** **Field    **Is          **Business   **Error     **Test   **Page**
  No.**                                         Length**   Mandatory**   Rule**       Message**   Data**   
  ------- ---------- ------------ ------------- ---------- ------------- ------------ ----------- -------- ----------
  1       Cash       User Input   Button/Tile   n/a        Yes           Tapping this n/a         n/a      Banking
          Deposit                                                        control                           App Home
          Tile                                                           initiates                         
                                                                         navigation                        
                                                                         to the Cash                       
                                                                         Deposit                           
                                                                         screen.                           

  2       Cash       System       Screen/View   n/a        Yes           Must be      n/a         n/a      Cash
          Deposit                                                        rendered in                       Deposit
          Screen                                                         the dark                          
                                                                         theme and                         
                                                                         load in                           
                                                                         under 2                           
                                                                         seconds.                          
  -------------------------------------------------------------------------------------------------------------------

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

  User taps the \"Cash Deposit\"      System navigates the user to the
  tile.                               Cash Deposit screen, rendered in
                                      the dark theme, within 2 seconds.

  Exception: User taps the \"Cash     System displays the \"Navigation
  Deposit\" tile, but a service error Error\" message (M-01) and the user
  occurs.                             remains on the Banking App Home
                                      screen.
  -----------------------------------------------------------------------

**Acceptance Criteria**

7.  GIVEN I am an authenticated Bank Customer on the Banking App Home
    screen WHEN I tap the \"Cash Deposit\" tile THEN I am navigated to
    the Cash Deposit screen.

8.  GIVEN I have successfully navigated to the Cash Deposit screen WHEN
    the screen is rendered THEN it is displayed using the application\'s
    defined dark theme.

9.  GIVEN I tap the \"Cash Deposit\" tile WHEN the system navigates to
    the Cash Deposit screen THEN the screen must finish loading and be
    interactive in under 2 seconds.

10. GIVEN the Cash Deposit screen is displayed WHEN it is inspected with
    an accessibility tool THEN it must meet WCAG 2.1 AA standards for
    all standard UI elements, including text contrast and touch target
    sizes for the dark theme.

11. GIVEN I am on the Banking App Home screen WHEN I tap the \"Cash
    Deposit\" tile and the navigation service fails THEN a user-friendly
    error message (M-01) is displayed, and I remain on the Banking App
    Home screen.

# E2-S4 --- Confirm Details to Stage a Cash Deposit

**Epic:** Mobile-Initiated ATM Cash Services

**Description**

As a Bank Customer on the Cash Deposit screen, I want to enter my card
details and tap the \"Confirm Deposit\" button, so that I can stage a
cash deposit transaction with the ATM Staging Service for later
completion at a physical ATM. The interaction must be secure,
performant, and handle validation and service failures gracefully.

**Impacted Areas**

  ------------------------------------------------------------------------------------
  **No.**      **Page Name**    **Action**      **Explanation**
  ------------ ---------------- --------------- --------------------------------------
  1            Cash Deposit     Modify          Add the Card Details input field, the
               Screen                           \"Confirm Deposit\" button, and the
                                                associated validation and submission
                                                logic.

  2            ATM Staging      Integrate       The \"Confirm Deposit\" action will
               Service                          trigger an encrypted API call to this
                                                backend service to stage the
                                                transaction.

  3            Application      Modify          Configure routing from the Cash
               Navigation                       Deposit screen to the TBD: Staged
                                                Deposit Confirmation Screen upon
                                                successful transaction staging.

                                                

  Sl. No.      Name             Source          Data Type

  1            Card Details     User Input      String

  2            Confirm Deposit  User Input      Button
               Button                           

                                                

  ID           AC               Subject         Content

  M-01         02               Card Details    Please enter your card details before
                                Required        confirming the deposit.

  M-02         03               Staging Failed  We were unable to stage your deposit
                                                at this time. Please try again later.

                                                

  User         System                           

  User is on   System displays                  
  the Cash     a Card Details                   
  Deposit      input field and                  
  screen.      a \"Confirm                      
               Deposit\"                        
               button.                          

  User enters  System accepts                   
  valid card   the input.                       
  details into                                  
  the input                                     
  field.                                        

  User taps    System sends the                 
  the          request to the                   
  \"Confirm    ATM Staging                      
  Deposit\"    Service and                      
  button.      navigates the                    
               user to the TBD:                 
               Staged Deposit                   
               Confirmation                     
               Screen within 3                  
               seconds.                         

  Exception:   System displays                  
  User taps    the \"Card                       
  the          Details                          
  \"Confirm    Required\" error                 
  Deposit\"    message (M-01).                  
  button       The user remains                 
  without      on the Cash                      
  entering     Deposit screen.                  
  card                                          
  details.                                      

                                                

  Number       User             IDM             User Role
               Classification   Authorization   

  1            Customer         Authenticated   Bank Customer
                                Session         
  ------------------------------------------------------------------------------------

**Data Dictionary**

  ---------------------------------------------------------------------------------------------------------------
  **Sl.   **Name**   **Source**   **Data   **Field    **Is          **Business   **Error      **Test   **Page**
  No.**                           Type**   Length**   Mandatory**   Rule**       Message**    Data**   
  ------- ---------- ------------ -------- ---------- ------------- ------------ ------------ -------- ----------
  1       Card       User Input   String   TBD        Yes           Must be      Please enter TBD      Cash
          Details                                                   entered      your card             Deposit
                                                                    before       details               
                                                                    tapping      before                
                                                                    \"Confirm    confirming            
                                                                    Deposit\".   the deposit.          
                                                                    Format                             
                                                                    validation                         
                                                                    is TBD.                            

  2       Confirm    User Input   Button   n/a        Yes           Submits the  n/a          n/a      Cash
          Deposit                                                   staged                             Deposit
          Button                                                    deposit                            
                                                                    request for                        
                                                                    processing                         
                                                                    by the ATM                         
                                                                    Staging                            
                                                                    Service.                           
  ---------------------------------------------------------------------------------------------------------------

**System Messages**

  -----------------------------------------------------------------------------------
  **ID**   **AC**   **Subject**   **Content**                            **Button**
  -------- -------- ------------- -------------------------------------- ------------
  M-01     02       Card Details  Please enter your card details before  OK
                    Required      confirming the deposit.                

  M-02     03       Staging       We were unable to stage your deposit   OK
                    Failed        at this time. Please try again later.  
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
  User is on the Cash Deposit screen. System displays a Card Details
                                      input field and a \"Confirm
                                      Deposit\" button.

  User enters valid card details into System accepts the input.
  the input field.                    

  User taps the \"Confirm Deposit\"   System sends the request to the ATM
  button.                             Staging Service and navigates the
                                      user to the TBD: Staged Deposit
                                      Confirmation Screen within 3
                                      seconds.

  Exception: User taps the \"Confirm  System displays the \"Card Details
  Deposit\" button without entering   Required\" error message (M-01).
  card details.                       The user remains on the Cash
                                      Deposit screen.
  -----------------------------------------------------------------------

**Acceptance Criteria**

12. GIVEN I am a Bank Customer on the Cash Deposit screen WHEN I enter
    valid card details and tap the \"Confirm Deposit\" button THEN the
    system initiates a secure request to the ATM Staging Service and,
    upon success, navigates me to the TBD: Staged Deposit Confirmation
    Screen.

13. GIVEN I am a Bank Customer on the Cash Deposit screen WHEN I tap the
    \"Confirm Deposit\" button without entering any card details THEN
    the system displays the \"Card Details Required\" error message
    (M-01), and I remain on the Cash Deposit screen.

14. GIVEN I have entered valid card details and tapped the \"Confirm
    Deposit\" button WHEN the ATM Staging Service is unavailable or
    returns a processing error THEN the system displays the \"Staging
    Failed\" error message (M-02), and I remain on the Cash Deposit
    screen.

15. GIVEN I have tapped the \"Confirm Deposit\" button WHEN the system
    processes the request THEN a response (success or failure) must be
    displayed to me in under 3 seconds.

16. GIVEN the Card Details input field and \"Confirm Deposit\" button
    are displayed on the Cash Deposit screen WHEN they are inspected
    with an accessibility tool THEN they must meet WCAG 2.1 AA standards
    for the dark theme, including appropriate labels, contrast, and
    minimum touch target sizes.

17. GIVEN a staging request is sent to the ATM Staging Service WHEN the
    request containing card data is transmitted THEN it must use a
    secure, encrypted channel as per the application\'s security
    standards.

# E2-S5 --- Scan Card to Auto-Populate Transaction Details

**Epic:** Mobile-Initiated ATM Cash Services

**Description**

As a Bank Customer on either the ATM Cash Withdrawal or Cash Deposit
screen, I want to tap a camera icon to launch my device\'s camera, scan
my physical bank card, and have the card details automatically populate
the required fields, so that I can reduce manual data entry and expedite
my transaction staging process.

**Impacted Areas**

  --------------------------------------------------------------------------------------
  **No.**        **Page Name**    **Action**      **Explanation**
  -------------- ---------------- --------------- --------------------------------------
  1              ATM Cash         Modify          Add a Camera Icon and the logic to
                 Withdrawal                       launch the On-Device Vision Service
                 Screen                           and receive populated card data.

  2              Cash Deposit     Modify          Add a Camera Icon and the logic to
                 Screen                           launch the On-Device Vision Service
                                                  and receive populated card data.

  3              On-Device Vision Integrate       Integrate the OCR module to capture,
                 Service                          process, and securely return card data
                                                  to the calling screen.

  4              Camera Interface Create          A new UI view/overlay for the camera
                                                  that guides the user in positioning
                                                  their card for scanning.

                                                  

  Sl. No.        Name             Source          Data Type

  1              Camera Icon      User Input      Button

  2              Card Details     On-Device       String
                                  Vision Service  

  3              Camera Interface System          View

                                                  

  ID             AC               Subject         Content

  M-01           03               Scan Failed     We were unable to read your card.
                                                  Please try again in a well-lit area or
                                                  enter the details manually.

                                                  

  User           System                           

  User is on the System displays                  
  ATM Cash       the Card Details                 
  Withdrawal     field and a                      
  screen.        Camera Icon next                 
                 to it.                           

  User taps the  System launches                  
  Camera Icon.   the device                       
                 camera with an                   
                 overlay guiding                  
                 the user to                      
                 position their                   
                 card.                            

  User           System populates                 
  successfully   the Card Details                 
  scans their    field on the ATM                 
  card.          Cash Withdrawal                  
                 screen and                       
                 closes the                       
                 camera                           
                 interface. The                   
                 process takes                    
                 less than 3                      
                 seconds.                         

  Exception:     The scan fails.                  
  User is in a   System displays                  
  dark room and  the \"Scan                       
  attempts to    Failed\" message                 
  scan their     (M-01).                          
  card.                                           

  User taps      System returns                   
  \"OK\" on the  the user to the                  
  message.       ATM Cash                         
                 Withdrawal                       
                 screen. The Card                 
                 Details field                    
                 remains empty.                   

                                                  

  Number         User             IDM             User Role
                 Classification   Authorization   

  1              Customer         Authenticated   Bank Customer
                                  Session         
  --------------------------------------------------------------------------------------

**Data Dictionary**

  ---------------------------------------------------------------------------------------------------------------------
  **Sl.   **Name**    **Source**   **Data   **Field    **Is          **Business      **Error     **Test   **Page**
  No.**                            Type**   Length**   Mandatory**   Rule**          Message**   Data**   
  ------- ----------- ------------ -------- ---------- ------------- --------------- ----------- -------- -------------
  1       Camera Icon User Input   Button   n/a        Yes           Tapping this    n/a         n/a      ATM Cash
                                                                     control                              Withdrawal,
                                                                     launches the                         Cash Deposit
                                                                     On-Device                            
                                                                     Vision Service                       
                                                                     and camera                           
                                                                     interface.                           

  2       Card        On-Device    String   TBD        Yes           Populated       n/a         TBD      ATM Cash
          Details     Vision                                         automatically                        Withdrawal,
                      Service                                        upon successful                      Cash Deposit
                                                                     card scan. Must                      
                                                                     not be stored                        
                                                                     on device.                           

  3       Camera      System       View     n/a        Yes           An overlay on   n/a         n/a      n/a
          Interface                                                  the device                           
                                                                     camera feed                          
                                                                     with guides for                      
                                                                     card placement.                      
                                                                     Must be WCAG                         
                                                                     2.1 AA                               
                                                                     compliant.                           
  ---------------------------------------------------------------------------------------------------------------------

**System Messages**

  -----------------------------------------------------------------------------------
  **ID**   **AC**   **Subject**   **Content**                            **Button**
  -------- -------- ------------- -------------------------------------- ------------
  M-01     03       Scan Failed   We were unable to read your card.      OK
                                  Please try again in a well-lit area or 
                                  enter the details manually.            

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
  User is on the ATM Cash Withdrawal  System displays the Card Details
  screen.                             field and a Camera Icon next to it.

  User taps the Camera Icon.          System launches the device camera
                                      with an overlay guiding the user to
                                      position their card.

  User successfully scans their card. System populates the Card Details
                                      field on the ATM Cash Withdrawal
                                      screen and closes the camera
                                      interface. The process takes less
                                      than 3 seconds.

  Exception: User is in a dark room   The scan fails. System displays the
  and attempts to scan their card.    \"Scan Failed\" message (M-01).

  User taps \"OK\" on the message.    System returns the user to the ATM
                                      Cash Withdrawal screen. The Card
                                      Details field remains empty.
  -----------------------------------------------------------------------

**Acceptance Criteria**

18. GIVEN I am a Bank Customer on the ATM Cash Withdrawal screen WHEN I
    tap the Camera Icon and successfully scan a valid card THEN I am
    returned to the ATM Cash Withdrawal screen, the Card Details field
    is populated, and the process from scan completion to field
    population completes in under 3 seconds.

19. GIVEN I am a Bank Customer on the Cash Deposit screen WHEN I tap the
    Camera Icon and successfully scan a valid card THEN I am returned to
    the Cash Deposit screen, and the Card Details field is populated.

20. GIVEN I am using the card scanning interface launched from either
    the ATM Cash Withdrawal or Cash Deposit screen WHEN the scan fails
    due to poor lighting, an unreadable card, or I cancel the operation
    THEN the system displays the \"Scan Failed\" error message (M-01),
    and I am returned to the previous screen with the Card Details field
    remaining empty.

21. GIVEN the camera interface is launched for card scanning WHEN it is
    inspected with an accessibility tool THEN the camera overlay,
    on-screen instructions, and controls must comply with WCAG 2.1 AA
    standards.

22. GIVEN card details have been successfully scanned and populated into
    the Card Details field WHEN the application\'s memory is inspected
    THEN the raw card data is handled via a secure, tokenized process
    and is not stored in persistent device storage after the session is
    complete.

23. GIVEN I attempt to scan a standard, undamaged payment card under
    normal lighting conditions WHEN the scan is performed THEN the scan
    must succeed and populate the correct data with a success rate
    greater than 95%.

# E2-S6 --- Enabler: Integrate with the Secure ATM Staging Service

**Epic:** Mobile-Initiated ATM Cash Services

**Description**

As a System, I need to establish a secure and reliable integration
client to communicate with the backend ATM Staging Service, so that
user-facing features like Cash Withdrawal and Cash Deposit can
successfully stage transactions. This enabler focuses on creating the
data contracts, security protocols, and error handling for all
communication with the service.

**Impacted Areas**

  ---------------------------------------------------------------------------------------------
  **No.**       **Page Name**              **Action**      **Explanation**
  ------------- -------------------------- --------------- ------------------------------------
  1             ATM Staging Service        Integrate       This story creates the client-side
                                                           code to securely connect and
                                                           transact with the backend ATM
                                                           Staging Service API.

  2             Mobile Application Service Create          A new, reusable service client
                Layer                                      module will be created within the
                                                           application to encapsulate all logic
                                                           for communicating with the ATM
                                                           Staging Service.

  3             ATM Cash Withdrawal Screen Integrate       This screen will be a consumer of
                                                           the new service client. Integration
                                                           will occur in a separate story.

  4             Cash Deposit Screen        Integrate       This screen will be a consumer of
                                                           the new service client. Integration
                                                           will occur in a separate story.

                                                           

  Sl. No.       Name                       Source          Data Type

  1             Staging Request Payload    System          JSON Object

  2             cardToken                  System          String

  3             amount                     System          Decimal

  4             Staging Response Payload   ATM Staging     JSON Object
                                           Service         

  5             transactionId              ATM Staging     String
                                           Service         

  6             Authorization Header       System          String

                                                           

  ID            AC                         Subject         Content

  M-01          04                         Service Timeout Request to ATM Staging Service timed
                                           (Internal Log)  out after 10 seconds.

  M-02          05                         Staging Failed  Received HTTP 4xx/5xx error from ATM
                                           (Internal Log)  Staging Service. Propagating failure
                                                           to UI layer.

                                                           

  User          System                                     

  A calling     The service client                         
  module (e.g., constructs a JSON payload                  
  from the Cash with the correct card                      
  Withdrawal    token and amount.                          
  screen)                                                  
  invokes the                                              
  service                                                  
  client to                                                
  stage a \$100                                            
  withdrawal.                                              

  n/a           The client sends an                        
                encrypted HTTPS POST                       
                request to the TBD:                        
                /transactions/withdrawal                   
                endpoint with the user\'s                  
                auth token in the header.                  

  n/a           The ATM Staging Service                    
                returns a 201 Created                      
                response with a JSON body                  
                containing a                               
                transactionId.                             

  n/a           The service client parses                  
                the response and returns a                 
                success object with the                    
                transactionId to the                       
                calling module.                            

  Exception: A  The client sends the                       
  calling       request and waits. After                   
  module        10 seconds, the request                    
  invokes the   times out. The client                      
  service       returns a                                  
  client, but   \'ServiceUnavailable\'                     
  the ATM       error object to the                        
  Staging       calling module and logs                    
  Service is    message M-01.                              
  offline.                                                 

                                                           

  Number        User Classification        IDM             User Role
                                           Authorization   

  1             System                     Authenticated   Bank Customer
                                           Session         
  ---------------------------------------------------------------------------------------------

**Data Dictionary**

  ----------------------------------------------------------------------------------------------------------------------------------------
  **Sl.   **Name**        **Source**   **Data    **Field    **Is          **Business Rule**  **Error     **Test Data**          **Page**
  No.**                                Type**    Length**   Mandatory**                      Message**                          
  ------- --------------- ------------ --------- ---------- ------------- ------------------ ----------- ---------------------- ----------
  1       Staging Request System       JSON      n/a        Yes           The data object    n/a         { \"transactionType\": n/a
          Payload                      Object                             sent to the ATM                \"withdrawal\",        
                                                                          Staging Service.               \"cardToken\":         
                                                                          Contains                       \"\...\", \"amount\":  
                                                                          transactionType,               100.00 }               
                                                                          cardToken, and                                        
                                                                          amount.                                               

  2       cardToken       System       String    TBD        Yes           A secure,          n/a         tok_123abc\...         n/a
                                                                          tokenized                                             
                                                                          representation of                                     
                                                                          the user\'s card                                      
                                                                          details. Raw card                                     
                                                                          data must not be                                      
                                                                          sent.                                                 

  3       amount          System       Decimal   n/a        Yes           The transaction    n/a         20.00                  n/a
                                                                          amount. Required                                      
                                                                          for withdrawals,                                      
                                                                          not for deposits.                                     

  4       Staging         ATM Staging  JSON      n/a        Yes           The response       n/a         { \"transactionId\":   n/a
          Response        Service      Object                             object received                \"\...\", \"status\":  
          Payload                                                         from the service.              \"staged\" }           
                                                                          Contains                                              
                                                                          transactionId and                                     
                                                                          status on success.                                    

  5       transactionId   ATM Staging  String    TBD        Yes           A unique           n/a         txn_xyz789\...         n/a
                          Service                                         identifier for the                                    
                                                                          staged                                                
                                                                          transaction,                                          
                                                                          returned upon                                         
                                                                          successful                                            
                                                                          processing.                                           

  6       Authorization   System       String    TBD        Yes           The HTTP header    n/a         Bearer eyJhbG\...      n/a
          Header                                                          containing the                                        
                                                                          user\'s                                               
                                                                          authenticated                                         
                                                                          session token                                         
                                                                          (e.g., Bearer                                         
                                                                          token).                                               
  ----------------------------------------------------------------------------------------------------------------------------------------

**System Messages**

  -----------------------------------------------------------------------------------
  **ID**   **AC**   **Subject**   **Content**                            **Button**
  -------- -------- ------------- -------------------------------------- ------------
  M-01     04       Service       Request to ATM Staging Service timed   n/a
                    Timeout       out after 10 seconds.                  
                    (Internal                                            
                    Log)                                                 

  M-02     05       Staging       Received HTTP 4xx/5xx error from ATM   n/a
                    Failed        Staging Service. Propagating failure   
                    (Internal     to UI layer.                           
                    Log)                                                 
  -----------------------------------------------------------------------------------

**User Permissions**

  ---------------------------------------------------------------------------------------
  **Number**   **User             **IDM             **User      **Description**
               Classification**   Authorization**   Role**      
  ------------ ------------------ ----------------- ----------- -------------------------
  1            System             Authenticated     Bank        All requests made by the
                                  Session           Customer    integration client to the
                                                                ATM Staging Service must
                                                                be on behalf of an
                                                                authenticated Bank
                                                                Customer and include
                                                                their session token for
                                                                authorization.

  ---------------------------------------------------------------------------------------

**User Scenarios**

  -----------------------------------------------------------------------
  **User**                            **System**
  ----------------------------------- -----------------------------------
  A calling module (e.g., from the    The service client constructs a
  Cash Withdrawal screen) invokes the JSON payload with the correct card
  service client to stage a \$100     token and amount.
  withdrawal.                         

  n/a                                 The client sends an encrypted HTTPS
                                      POST request to the TBD:
                                      /transactions/withdrawal endpoint
                                      with the user\'s auth token in the
                                      header.

  n/a                                 The ATM Staging Service returns a
                                      201 Created response with a JSON
                                      body containing a transactionId.

  n/a                                 The service client parses the
                                      response and returns a success
                                      object with the transactionId to
                                      the calling module.

  Exception: A calling module invokes The client sends the request and
  the service client, but the ATM     waits. After 10 seconds, the
  Staging Service is offline.         request times out. The client
                                      returns a \'ServiceUnavailable\'
                                      error object to the calling module
                                      and logs message M-01.
  -----------------------------------------------------------------------

**Acceptance Criteria**

24. GIVEN a request to stage a transaction is initiated WHEN the request
    is sent to the ATM Staging Service THEN the communication must occur
    over a secure, encrypted HTTPS channel.

25. GIVEN a request to stage a cash withdrawal is initiated with a valid
    amount and card token WHEN the integration client sends the request
    THEN a valid JSON payload is sent to the TBD:
    /transactions/withdrawal endpoint, and the client correctly
    processes the success (201) or failure (4xx/5xx) response.

26. GIVEN a request to stage a cash deposit is initiated with a valid
    card token WHEN the integration client sends the request THEN a
    valid JSON payload is sent to the TBD: /transactions/deposit
    endpoint, and the client correctly processes the success (201) or
    failure (4xx/5xx) response.

27. GIVEN the ATM Staging Service is unavailable or does not respond
    within 10 seconds WHEN the integration client attempts to send a
    request THEN the client must time out and return a
    \'ServiceUnavailable\' error to the calling application layer.

28. GIVEN the ATM Staging Service returns a client-side error (e.g., 400
    Bad Request for invalid data) WHEN the integration client receives
    the response THEN the client must parse the error code and message
    from the response body and return a \'StagingFailed\' error to the
    calling application layer.

29. GIVEN any request is sent to the ATM Staging Service WHEN the
    integration client constructs the request THEN it must include the
    current user\'s authenticated session token in the HTTP
    Authorization header.

# E3-S1 --- View Account Balance on Enquiry Screen

**Epic:** Digital Account Management and Fund Transfers

**Description**

As a Bank Customer, I want to view my current savings account balance
when I access the Balance Enquiry screen, so that I have real-time
visibility of my funds. The balance must be fetched securely from the
Core Banking Service and displayed in a clear, accessible format
consistent with the application\'s light theme.

**Impacted Areas**

  --------------------------------------------------------------------------------------
  **No.**        **Page Name**     **Action**      **Explanation**
  -------------- ----------------- --------------- -------------------------------------
  1              Balance Enquiry   Modify          Add UI elements to display the
                 Screen                            account balance and logic to fetch
                                                   data upon screen load.

  2              Core Banking      Integrate       A secure API call is required to
                 Service                           fetch the real-time Savings Account
                                                   Balance.

  3              UI Theming Engine Integrate       The new UI elements for displaying
                                                   the balance must correctly apply the
                                                   Light Theme.

                                                   

  Sl. No.        Name              Source          Data Type

  1              Balance Enquiry   System          Screen/View
                 Screen                            

  2              Savings Account   Core Banking    Decimal
                 Balance           Service         

  3              Light Theme       System          Configuration

                                                   

  ID             AC                Subject         Content

  M-01           04                Service         We could not retrieve your account
                                   Unavailable     balance at this time. Please try
                                                   again later.

  M-02           05                Balance         There was a problem retrieving your
                                   Unavailable     account details. Please contact
                                                   support if the issue persists.

                                                   

  User           System                            

  User navigates The system                        
  to the Balance initiates a                       
  Enquiry        secure call to                    
  screen.        the Core Banking                  
                 Service. The                      
                 service returns                   
                 the balance                       
                 successfully. The                 
                 system displays                   
                 the Savings                       
                 Account Balance                   
                 as                                
                 \"\$10,500.00\"                   
                 on the Balance                    
                 Enquiry Screen                    
                 within 1.5                        
                 seconds.                          

  Exception:     The system                        
  User navigates displays the                      
  to the Balance Service                           
  Enquiry        Unavailable Error                 
  screen, but    message (M-01) on                 
  the Core       the Balance                       
  Banking        Enquiry Screen.                   
  Service is                                       
  unreachable.                                     

                                                   

  Number         User              IDM             User Role
                 Classification    Authorization   

  1              Customer          Authenticated   Bank Customer
                                   Session         
  --------------------------------------------------------------------------------------

**Data Dictionary**

  --------------------------------------------------------------------------------------------------------------------------
  **Sl.   **Name**   **Source**   **Data Type**   **Field    **Is          **Business    **Error       **Test     **Page**
  No.**                                           Length**   Mandatory**   Rule**        Message**     Data**     
  ------- ---------- ------------ --------------- ---------- ------------- ------------- ------------- ---------- ----------
  1       Balance    System       Screen/View     n/a        Yes           Container for n/a           n/a        Balance
          Enquiry                                                          the balance                            Enquiry
          Screen                                                           display. Must                          
                                                                           be rendered                            
                                                                           in the Light                           
                                                                           Theme.                                 

  2       Savings    Core Banking Decimal         TBD        Yes           Must be a     Service       10500.00   Balance
          Account    Service                                               numerical     Unavailable              Enquiry
          Balance                                                          value.        Error (M-01),            
                                                                           Displayed     Data                     
                                                                           with currency Retrieval                
                                                                           symbol, comma Error (M-02)             
                                                                           separators,                            
                                                                           and two                                
                                                                           decimal                                
                                                                           places.                                

  3       Light      System       Configuration   n/a        Yes           The set of    n/a           n/a        Balance
          Theme                                                            visual styles                          Enquiry
                                                                           (colors,                               
                                                                           fonts) to be                           
                                                                           applied to                             
                                                                           the screen.                            
  --------------------------------------------------------------------------------------------------------------------------

**System Messages**

  -----------------------------------------------------------------------------------
  **ID**   **AC**   **Subject**   **Content**                            **Button**
  -------- -------- ------------- -------------------------------------- ------------
  M-01     04       Service       We could not retrieve your account     OK
                    Unavailable   balance at this time. Please try again 
                                  later.                                 

  M-02     05       Balance       There was a problem retrieving your    OK
                    Unavailable   account details. Please contact        
                                  support if the issue persists.         
  -----------------------------------------------------------------------------------

**User Permissions**

  ---------------------------------------------------------------------------------------
  **Number**   **User             **IDM             **User      **Description**
               Classification**   Authorization**   Role**      
  ------------ ------------------ ----------------- ----------- -------------------------
  1            Customer           Authenticated     Bank        A standard customer who
                                  Session           Customer    has successfully
                                                                authenticated and is
                                                                authorized to view their
                                                                own account information.

  ---------------------------------------------------------------------------------------

**User Scenarios**

  -----------------------------------------------------------------------
  **User**                            **System**
  ----------------------------------- -----------------------------------
  User navigates to the Balance       The system initiates a secure call
  Enquiry screen.                     to the Core Banking Service. The
                                      service returns the balance
                                      successfully. The system displays
                                      the Savings Account Balance as
                                      \"\$10,500.00\" on the Balance
                                      Enquiry Screen within 1.5 seconds.

  Exception: User navigates to the    The system displays the Service
  Balance Enquiry screen, but the     Unavailable Error message (M-01) on
  Core Banking Service is             the Balance Enquiry Screen.
  unreachable.                        
  -----------------------------------------------------------------------

**Acceptance Criteria**

30. GIVEN I am an authenticated Bank Customer on the Balance Enquiry
    Screen WHEN the screen successfully retrieves data from the Core
    Banking Service THEN my Savings Account Balance is displayed,
    formatted as currency (e.g., \$10,500.00).

31. GIVEN I navigate to the Balance Enquiry Screen WHEN the screen
    initiates the data fetch THEN the Savings Account Balance must be
    retrieved and displayed in under 1.5 seconds.

32. GIVEN the Savings Account Balance is displayed on the Balance
    Enquiry Screen WHEN the screen is inspected with an accessibility
    tool THEN the balance text must meet WCAG 2.1 AA contrast ratio
    requirements for the Light Theme.

33. GIVEN I am on the Balance Enquiry Screen WHEN the system fails to
    connect to the Core Banking Service to retrieve the balance THEN the
    Service Unavailable Error message (M-01) is displayed in place of
    the balance amount.

34. GIVEN I am on the Balance Enquiry Screen WHEN the Core Banking
    Service returns an error or invalid data for my account THEN the
    Data Retrieval Error message (M-02) is displayed in place of the
    balance amount.

# E3-S2 --- Access Cash Services from Balance Enquiry Screen

**Epic:** Digital Account Management and Fund Transfers

**Description**

As a Bank Customer, I want to use the \"Withdraw\" and \"Deposit\"
action controls on the Balance Enquiry screen, so that I can quickly
navigate to the respective screens to initiate cash transactions. The
navigation must be performant, and the destination screens must be
rendered in their specified themes (light for withdrawal, dark for
deposit).

**Impacted Areas**

  ------------------------------------------------------------------------------------
  **No.**      **Page Name**    **Action**      **Explanation**
  ------------ ---------------- --------------- --------------------------------------
  1            Balance Enquiry  Modify          Add navigation logic to the
               Screen                           \"Withdraw\" and \"Deposit\" action
                                                controls.

  2            Application      Modify          Configure the routing paths from the
               Navigation                       Balance Enquiry screen to the ATM Cash
                                                Withdrawal and Cash Deposit screens.

  3            ATM Cash         Integrate       This screen is the destination for the
               Withdrawal                       \"Withdraw\" navigation action.
               Screen                           

  4            Cash Deposit     Integrate       This screen is the destination for the
               Screen                           \"Deposit\" navigation action.

                                                

  Sl. No.      Name             Source          Data Type

  1            Balance Enquiry  System          Screen/View
               Screen                           

  2            Withdraw Action  User Input      Button/Control

  3            Deposit Action   User Input      Button/Control

  4            ATM Cash         System          Screen/View
               Withdrawal                       
               Screen                           

  5            Cash Deposit     System          Screen/View
               Screen                           

  6            Light Theme      System          Configuration

  7            Dark Theme       System          Configuration

                                                

  ID           AC               Subject         Content

  M-01         07               Navigation      We\'re sorry, we couldn\'t load that
                                Error           screen right now. Please try again.

                                                

  User         System                           

  User is on   The system                       
  the Balance  displays the                     
  Enquiry      screen with                      
  Screen.      \"Withdraw\" and                 
               \"Deposit\"                      
               action controls.                 

  User taps    The system                       
  the Withdraw navigates the                    
  Action       user to the ATM                  
  control.     Cash Withdrawal                  
               Screen, rendered                 
               in the Light                     
               Theme, within 2                  
               seconds.                         

  User         The system                       
  navigates    navigates the                    
  back to the  user to the Cash                 
  Balance      Deposit Screen,                  
  Enquiry      rendered in the                  
  Screen and   Dark Theme,                      
  taps the     within 2                         
  Deposit      seconds.                         
  Action                                        
  control.                                      

  Exception:   The system                       
  User taps    displays the                     
  the Withdraw Navigation Error                 
  Action       message (M-01),                  
  control, but and the user                     
  a service    remains on the                   
  error        Balance Enquiry                  
  occurs.      Screen.                          

                                                

  Number       User             IDM             User Role
               Classification   Authorization   

  1            Customer         Authenticated   Bank Customer
                                Session         
  ------------------------------------------------------------------------------------

**Data Dictionary**

  ----------------------------------------------------------------------------------------------------------------------------
  **Sl.   **Name**     **Source**   **Data Type**    **Field    **Is          **Business     **Error     **Test   **Page**
  No.**                                              Length**   Mandatory**   Rule**         Message**   Data**   
  ------- ------------ ------------ ---------------- ---------- ------------- -------------- ----------- -------- ------------
  1       Balance      System       Screen/View      n/a        Yes           Container for  n/a         n/a      Balance
          Enquiry                                                             the action                          Enquiry
          Screen                                                              controls. Must                      
                                                                              be rendered in                      
                                                                              the Light                           
                                                                              Theme.                              

  2       Withdraw     User Input   Button/Control   n/a        Yes           Tapping this   n/a         n/a      Balance
          Action                                                              control                             Enquiry
                                                                              initiates                           
                                                                              navigation to                       
                                                                              the ATM Cash                        
                                                                              Withdrawal                          
                                                                              Screen.                             

  3       Deposit      User Input   Button/Control   n/a        Yes           Tapping this   n/a         n/a      Balance
          Action                                                              control                             Enquiry
                                                                              initiates                           
                                                                              navigation to                       
                                                                              the Cash                            
                                                                              Deposit                             
                                                                              Screen.                             

  4       ATM Cash     System       Screen/View      n/a        Yes           Destination    n/a         n/a      ATM Cash
          Withdrawal                                                          screen for the                      Withdrawal
          Screen                                                              \"Withdraw\"                        
                                                                              action. Must                        
                                                                              be rendered in                      
                                                                              the Light                           
                                                                              Theme.                              

  5       Cash Deposit System       Screen/View      n/a        Yes           Destination    n/a         n/a      Cash Deposit
          Screen                                                              screen for the                      
                                                                              \"Deposit\"                         
                                                                              action. Must                        
                                                                              be rendered in                      
                                                                              the Dark                            
                                                                              Theme.                              

  6       Light Theme  System       Configuration    n/a        Yes           The set of     n/a         n/a      ATM Cash
                                                                              visual styles                       Withdrawal
                                                                              (colors,                            
                                                                              fonts) to be                        
                                                                              applied to the                      
                                                                              ATM Cash                            
                                                                              Withdrawal                          
                                                                              Screen.                             

  7       Dark Theme   System       Configuration    n/a        Yes           The set of     n/a         n/a      Cash Deposit
                                                                              visual styles                       
                                                                              (colors,                            
                                                                              fonts) to be                        
                                                                              applied to the                      
                                                                              Cash Deposit                        
                                                                              Screen.                             
  ----------------------------------------------------------------------------------------------------------------------------

**System Messages**

  -----------------------------------------------------------------------------------
  **ID**   **AC**   **Subject**   **Content**                            **Button**
  -------- -------- ------------- -------------------------------------- ------------
  M-01     07       Navigation    We\'re sorry, we couldn\'t load that   OK
                    Error         screen right now. Please try again.    

  -----------------------------------------------------------------------------------

**User Permissions**

  ---------------------------------------------------------------------------------------
  **Number**   **User             **IDM             **User      **Description**
               Classification**   Authorization**   Role**      
  ------------ ------------------ ----------------- ----------- -------------------------
  1            Customer           Authenticated     Bank        A standard customer who
                                  Session           Customer    has successfully
                                                                authenticated and is
                                                                authorized to view their
                                                                account information and
                                                                access transaction
                                                                screens.

  ---------------------------------------------------------------------------------------

**User Scenarios**

  -----------------------------------------------------------------------
  **User**                            **System**
  ----------------------------------- -----------------------------------
  User is on the Balance Enquiry      The system displays the screen with
  Screen.                             \"Withdraw\" and \"Deposit\" action
                                      controls.

  User taps the Withdraw Action       The system navigates the user to
  control.                            the ATM Cash Withdrawal Screen,
                                      rendered in the Light Theme, within
                                      2 seconds.

  User navigates back to the Balance  The system navigates the user to
  Enquiry Screen and taps the Deposit the Cash Deposit Screen, rendered
  Action control.                     in the Dark Theme, within 2
                                      seconds.

  Exception: User taps the Withdraw   The system displays the Navigation
  Action control, but a service error Error message (M-01), and the user
  occurs.                             remains on the Balance Enquiry
                                      Screen.
  -----------------------------------------------------------------------

**Acceptance Criteria**

35. GIVEN I am an authenticated Bank Customer on the Balance Enquiry
    Screen WHEN I tap the Withdraw Action control THEN I am navigated to
    the ATM Cash Withdrawal Screen.

36. GIVEN I am an authenticated Bank Customer on the Balance Enquiry
    Screen WHEN I tap the Deposit Action control THEN I am navigated to
    the Cash Deposit Screen.

37. GIVEN I have successfully navigated to the ATM Cash Withdrawal
    Screen WHEN the screen is rendered THEN it is displayed using the
    application\'s defined Light Theme.

38. GIVEN I have successfully navigated to the Cash Deposit Screen WHEN
    the screen is rendered THEN it is displayed using the application\'s
    defined Dark Theme.

39. GIVEN I tap either the Withdraw Action or Deposit Action control
    WHEN the system navigates to the destination screen THEN the screen
    must finish loading and be interactive in under 2 seconds.

40. GIVEN the Withdraw Action and Deposit Action controls are displayed
    on the Balance Enquiry Screen WHEN the screen is inspected with an
    accessibility tool THEN the controls must meet WCAG 2.1 AA
    requirements for touch target size.

41. GIVEN I am on the Balance Enquiry Screen WHEN I tap an action
    control and the navigation service fails THEN the Navigation Error
    message (M-01) is displayed, and I remain on the Balance Enquiry
    Screen.

# E3-S3 --- Execute a Successful Fund Transfer

**Epic:** Digital Account Management and Fund Transfers

**Description**

As a Bank Customer, I want to select my \'From\' and \'To\' accounts,
enter a valid amount, and submit the request on the Transfer Funds
screen, so that I can securely move money between my accounts and
receive a confirmation.

**Impacted Areas**

  --------------------------------------------------------------------------------------
  **No.**        **Page Name**    **Action**      **Explanation**
  -------------- ---------------- --------------- --------------------------------------
  1              Transfer Funds   Modify          Implement the submission logic for the
                 Screen                           Submit Button, including data
                                                  validation, service integration, and
                                                  response handling.

  2              Core Banking     Integrate       Send an encrypted API request to the
                 Service                          service to execute the atomic fund
                                                  transfer transaction.

  3              Application      Modify          Configure the routing path from the
                 Navigation                       Transfer Funds Screen to the TBD:
                                                  Transfer Confirmation Screen upon
                                                  successful transfer.

                                                  

  Sl. No.        Name             Source          Data Type

  1              From Account     User Input      Dropdown/Selector
                 Selector                         

  2              To Account       User Input      Dropdown/Selector
                 Selector                         

  3              Amount           User Input      Decimal

  4              Submit Button    User Input      Button

  5              Transfer         Core Banking    JSON Object
                 Response         Service         

                                                  

  ID             AC               Subject         Content

  M-01           04               Transfer Failed We were unable to process your
                                                  transfer at this time. No funds have
                                                  been moved. Please try again later.

                                                  

  User           System                           

  User is on the System displays                  
  Transfer Funds selectors for                    
  Screen.        From Account and                 
                 To Account, an                   
                 Amount field,                    
                 and a Submit                     
                 Button.                          

  User selects   The field is                     
  \"Savings\"    populated with                   
  from the From  \"Savings\".                     
  Account                                         
  Selector.                                       

  User selects   The field is                     
  \"Checking\"   populated with                   
  from the To    \"Checking\".                    
  Account                                         
  Selector.                                       

  User enters    The field                        
  \"100.00\"     displays                         
  into the       \"100.00\".                      
  Amount field.                                   

  User taps the  System sends a                   
  Submit Button. secure request                   
                 to the Core                      
                 Banking Service                  
                 and, within 3                    
                 seconds,                         
                 navigates the                    
                 user to the TBD:                 
                 Transfer                         
                 Confirmation                     
                 Screen.                          

  Exception:     The system                       
  User submits a displays the                     
  valid request, Transfer Failed                  
  but the Core   error message                    
  Banking        (M-01). The user                 
  Service is     remains on the                   
  down.          Transfer Funds                   
                 Screen.                          

                                                  

  Number         User             IDM             User Role
                 Classification   Authorization   

  1              Customer         Authenticated   Bank Customer
                                  Session         
  --------------------------------------------------------------------------------------

**Data Dictionary**

  --------------------------------------------------------------------------------------------------------------------------------------
  **Sl.   **Name**   **Source**   **Data Type**       **Field    **Is          **Business    **Error     **Test Data**        **Page**
  No.**                                               Length**   Mandatory**   Rule**        Message**                        
  ------- ---------- ------------ ------------------- ---------- ------------- ------------- ----------- -------------------- ----------
  1       From       User Input   Dropdown/Selector   n/a        Yes           Must be       Select a    Savings              Transfer
          Account                                                              selected      \'From\'                         Funds
          Selector                                                             before        account.                         
                                                                               submission.                                    
                                                                               Cannot be the                                  
                                                                               same as the                                    
                                                                               To Account.                                    

  2       To Account User Input   Dropdown/Selector   n/a        Yes           Must be       Select a    Checking             Transfer
          Selector                                                             selected      \'To\'                           Funds
                                                                               before        account.                         
                                                                               submission.                                    
                                                                               Cannot be the                                  
                                                                               same as the                                    
                                                                               From Account.                                  

  3       Amount     User Input   Decimal             TBD        Yes           Must be a     Enter a     100.00               Transfer
                                                                               positive      valid                            Funds
                                                                               number        amount.                          
                                                                               greater than                                   
                                                                               zero and less                                  
                                                                               than or equal                                  
                                                                               to the From                                    
                                                                               Account                                        
                                                                               balance.                                       

  4       Submit     User Input   Button              n/a        Yes           Initiates the n/a         n/a                  Transfer
          Button                                                               fund transfer                                  Funds
                                                                               request to                                     
                                                                               the Core                                       
                                                                               Banking                                        
                                                                               Service.                                       

  5       Transfer   Core Banking JSON Object         n/a        Yes           The success   n/a         {\"status\":         n/a
          Response   Service                                                   or failure                \"success\",         
                                                                               response from             \"transactionId\":   
                                                                               the backend.              \"TXN12345\"}        
                                                                               Must be                                        
                                                                               received in                                    
                                                                               under 3                                        
                                                                               seconds.                                       
  --------------------------------------------------------------------------------------------------------------------------------------

**System Messages**

  -----------------------------------------------------------------------------------
  **ID**   **AC**   **Subject**   **Content**                            **Button**
  -------- -------- ------------- -------------------------------------- ------------
  M-01     04       Transfer      We were unable to process your         OK
                    Failed        transfer at this time. No funds have   
                                  been moved. Please try again later.    

  -----------------------------------------------------------------------------------

**User Permissions**

  ---------------------------------------------------------------------------------------
  **Number**   **User             **IDM             **User      **Description**
               Classification**   Authorization**   Role**      
  ------------ ------------------ ----------------- ----------- -------------------------
  1            Customer           Authenticated     Bank        A standard customer who
                                  Session           Customer    has successfully
                                                                authenticated and is
                                                                authorized to access and
                                                                transact with their own
                                                                accounts.

  ---------------------------------------------------------------------------------------

**User Scenarios**

  -----------------------------------------------------------------------
  **User**                            **System**
  ----------------------------------- -----------------------------------
  User is on the Transfer Funds       System displays selectors for From
  Screen.                             Account and To Account, an Amount
                                      field, and a Submit Button.

  User selects \"Savings\" from the   The field is populated with
  From Account Selector.              \"Savings\".

  User selects \"Checking\" from the  The field is populated with
  To Account Selector.                \"Checking\".

  User enters \"100.00\" into the     The field displays \"100.00\".
  Amount field.                       

  User taps the Submit Button.        System sends a secure request to
                                      the Core Banking Service and,
                                      within 3 seconds, navigates the
                                      user to the TBD: Transfer
                                      Confirmation Screen.

  Exception: User submits a valid     The system displays the Transfer
  request, but the Core Banking       Failed error message (M-01). The
  Service is down.                    user remains on the Transfer Funds
                                      Screen.
  -----------------------------------------------------------------------

**Acceptance Criteria**

42. GIVEN I am on the Transfer Funds Screen and have selected a valid
    From Account and To Account and entered a valid Amount WHEN I tap
    the Submit Button THEN a secure request is sent to the Core Banking
    Service to execute the transfer, and upon success, I am navigated to
    the TBD: Transfer Confirmation Screen.

43. GIVEN I have tapped the Submit Button with valid data WHEN the
    system processes the fund transfer THEN a confirmation response must
    be received from the Core Banking Service and the UI updated in
    under 3 seconds.

44. GIVEN a fund transfer request is initiated WHEN the request
    containing account and amount details is sent to the Core Banking
    Service THEN the communication must occur over a secure, encrypted
    channel.

45. GIVEN I have submitted a valid transfer request WHEN the Core
    Banking Service is unavailable or returns a generic processing error
    THEN the Transfer Failed error message (M-01) is displayed, and I
    remain on the Transfer Funds Screen.

46. GIVEN the From Account Selector, To Account Selector, Amount input
    field, and Submit Button are displayed on the Transfer Funds Screen
    WHEN the screen is inspected with an accessibility tool THEN all
    interactive elements must meet WCAG 2.1 AA standards for the Dark
    Theme, including appropriate labels, contrast ratios, and minimum
    touch target sizes.

# E3-S4 --- Receive Validation for Fund Transfer Inputs

**Epic:** Digital Account Management and Fund Transfers

**Description**

As a Bank Customer, I want to receive clear error messages if I try to
submit a transfer without selecting accounts, entering an amount, or if
I have insufficient funds, so that I can correct my inputs before a
transaction is processed.

**Impacted Areas**

  ----------------------------------------------------------------------------------------
  **No.**          **Page Name**    **Action**      **Explanation**
  ---------------- ---------------- --------------- --------------------------------------
  1                Transfer Funds   Modify          Implement client-side validation logic
                   Screen                           for account selectors and the amount
                                                    field. Implement handling for
                                                    server-side error responses.

  2                Core Banking     Integrate       Handle the specific error response
                   Service                          code/message for \"Insufficient
                                                    Funds\" when a transfer request is
                                                    rejected for this reason.

                                                    

  Sl. No.          Name             Source          Data Type

  1                From Account     User Input      Dropdown
                   Selector                         

  2                To Account       User Input      Dropdown
                   Selector                         

  3                Amount           User Input      Decimal

  4                Submit Button    User Input      Button

  5                From Account     Core Banking    Decimal
                   Balance          Service         

                                                    

  ID               AC               Subject         Content

  M-01             01               \'From\'        Please select an account to transfer
                                    Account         funds from.
                                    Required        

  M-02             02               \'To\' Account  Please select an account to transfer
                                    Required        funds to.

  M-03             03               Invalid Account The \'From\' and \'To\' accounts
                                    Selection       cannot be the same.

  M-04             04               Amount Required Please enter an amount to transfer.

  M-05             05               Invalid Amount  Please enter an amount greater than
                                                    zero.

  M-06             06               Insufficient    The amount exceeds the available
                                    Funds           balance in your selected account.

                                                    

  User             System                           

  User is on the   System displays                  
  Transfer Funds   From Account                     
  Screen.          Selector, To                     
                   Account                          
                   Selector, Amount                 
                   field, and                       
                   Submit Button.                   

  User selects     The fields are                   
  \"Savings\" from populated.                       
  From Account                                      
  Selector and                                      
  \"Checking\"                                      
  from To Account                                   
  Selector.                                         

  User leaves the  System displays                  
  Amount field     the \"Amount                     
  blank and taps   Required\" error                 
  the Submit       message (M-04).                  
  Button.          The user remains                 
                   on the Transfer                  
                   Funds Screen.                    

  Exception: User  The user taps                    
  enters an Amount the Submit                       
  of \"12000.00\", Button.                          
  which is greater                                  
  than the From                                     
  Account Balance                                   
  of \"10500.00\".                                  

  System sends the                                  
  request,                                          
  receives an                                       
  error from the                                    
  Core Banking                                      
  Service, and                                      
  displays the                                      
  \"Insufficient                                    
  Funds\" error                                     
  message (M-06).                                   

                                                    

  Number           User             IDM             User Role
                   Classification   Authorization   

  1                Customer         Authenticated   Bank Customer
                                    Session         
  ----------------------------------------------------------------------------------------

**Data Dictionary**

  ------------------------------------------------------------------------------------------------------------------
  **Sl.   **Name**   **Source**   **Data     **Field    **Is          **Business   **Error     **Test     **Page**
  No.**                           Type**     Length**   Mandatory**   Rule**       Message**   Data**     
  ------- ---------- ------------ ---------- ---------- ------------- ------------ ----------- ---------- ----------
  1       From       User Input   Dropdown   n/a        Yes           Must be      Please      Savings    Transfer
          Account                                                     selected.    select an              Funds
          Selector                                                    Cannot be    account to             
                                                                      the same as  transfer               
                                                                      To Account   funds from.            
                                                                      Selector.                           

  2       To Account User Input   Dropdown   n/a        Yes           Must be      Please      Checking   Transfer
          Selector                                                    selected.    select an              Funds
                                                                      Cannot be    account to             
                                                                      the same as  transfer               
                                                                      From Account funds to.              
                                                                      Selector.                           

  3       Amount     User Input   Decimal    TBD        Yes           Must be a    Please      50.00      Transfer
                                                                      positive     enter an               Funds
                                                                      number       amount                 
                                                                      greater than greater                
                                                                      zero. Must   than zero.             
                                                                      not exceed                          
                                                                      From Account                        
                                                                      Balance.                            

  4       Submit     User Input   Button     n/a        Yes           Triggers     n/a         n/a        Transfer
          Button                                                      validation                          Funds
                                                                      and                                 
                                                                      submission                          
                                                                      of the                              
                                                                      transfer                            
                                                                      request.                            

  5       From       Core Banking Decimal    TBD        Yes           Used to      The amount  10500.00   Transfer
          Account    Service                                          validate     exceeds the            Funds
          Balance                                                     against the  available              
                                                                      entered      balance in             
                                                                      Amount.      your                   
                                                                                   selected               
                                                                                   account.               
  ------------------------------------------------------------------------------------------------------------------

**System Messages**

  ------------------------------------------------------------------------------------
  **ID**   **AC**   **Subject**    **Content**                            **Button**
  -------- -------- -------------- -------------------------------------- ------------
  M-01     01       \'From\'       Please select an account to transfer   OK
                    Account        funds from.                            
                    Required                                              

  M-02     02       \'To\' Account Please select an account to transfer   OK
                    Required       funds to.                              

  M-03     03       Invalid        The \'From\' and \'To\' accounts       OK
                    Account        cannot be the same.                    
                    Selection                                             

  M-04     04       Amount         Please enter an amount to transfer.    OK
                    Required                                              

  M-05     05       Invalid Amount Please enter an amount greater than    OK
                                   zero.                                  

  M-06     06       Insufficient   The amount exceeds the available       OK
                    Funds          balance in your selected account.      
  ------------------------------------------------------------------------------------

**User Permissions**

  ---------------------------------------------------------------------------------------
  **Number**   **User             **IDM             **User      **Description**
               Classification**   Authorization**   Role**      
  ------------ ------------------ ----------------- ----------- -------------------------
  1            Customer           Authenticated     Bank        A standard customer who
                                  Session           Customer    has successfully
                                                                authenticated and is
                                                                authorized to access and
                                                                transact with their own
                                                                accounts.

  ---------------------------------------------------------------------------------------

**User Scenarios**

  -----------------------------------------------------------------------
  **User**                            **System**
  ----------------------------------- -----------------------------------
  User is on the Transfer Funds       System displays From Account
  Screen.                             Selector, To Account Selector,
                                      Amount field, and Submit Button.

  User selects \"Savings\" from From  The fields are populated.
  Account Selector and \"Checking\"   
  from To Account Selector.           

  User leaves the Amount field blank  System displays the \"Amount
  and taps the Submit Button.         Required\" error message (M-04).
                                      The user remains on the Transfer
                                      Funds Screen.

  Exception: User enters an Amount of The user taps the Submit Button.
  \"12000.00\", which is greater than 
  the From Account Balance of         
  \"10500.00\".                       

  System sends the request, receives  
  an error from the Core Banking      
  Service, and displays the           
  \"Insufficient Funds\" error        
  message (M-06).                     
  -----------------------------------------------------------------------

**Acceptance Criteria**

47. GIVEN I am on the Transfer Funds Screen WHEN I tap the Submit Button
    without selecting a From Account THEN the error message (M-01) is
    displayed, and no transfer request is initiated.

48. GIVEN I am on the Transfer Funds Screen WHEN I tap the Submit Button
    without selecting a To Account THEN the error message (M-02) is
    displayed, and no transfer request is initiated.

49. GIVEN I am on the Transfer Funds Screen and have selected the same
    account for the From Account Selector and To Account Selector WHEN I
    tap the Submit Button THEN the error message (M-03) is displayed,
    and no transfer request is initiated.

50. GIVEN I am on the Transfer Funds Screen WHEN I tap the Submit Button
    without entering a value in the Amount field THEN the error message
    (M-04) is displayed, and no transfer request is initiated.

51. GIVEN I am on the Transfer Funds Screen and have entered an Amount
    of zero or a negative value WHEN I tap the Submit Button THEN the
    error message (M-05) is displayed, and no transfer request is
    initiated.

52. GIVEN I am on the Transfer Funds Screen and have entered an Amount
    that exceeds the available balance of the selected From Account WHEN
    I tap the Submit Button THEN the Core Banking Service returns an
    insufficient funds error, the error message (M-06) is displayed, and
    the transfer is not processed.

53. GIVEN an error message is displayed for an invalid field on the
    Transfer Funds Screen WHEN the screen is inspected with an
    accessibility tool THEN the error message text is programmatically
    associated with its corresponding input field (e.g., via
    aria-describedby) to meet WCAG 2.1 AA standards.
