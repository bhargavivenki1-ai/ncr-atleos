# Access the Cash Deposit Screen

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

1.  GIVEN I am an authenticated Bank Customer on the Banking App Home
    screen WHEN I tap the \"Cash Deposit\" tile THEN I am navigated to
    the Cash Deposit screen.

2.  GIVEN I have successfully navigated to the Cash Deposit screen WHEN
    the screen is rendered THEN it is displayed using the application\'s
    defined dark theme.

3.  GIVEN I tap the \"Cash Deposit\" tile WHEN the system navigates to
    the Cash Deposit screen THEN the screen must finish loading and be
    interactive in under 2 seconds.

4.  GIVEN the Cash Deposit screen is displayed WHEN it is inspected with
    an accessibility tool THEN it must meet WCAG 2.1 AA standards for
    all standard UI elements, including text contrast and touch target
    sizes for the dark theme.

5.  GIVEN I am on the Banking App Home screen WHEN I tap the \"Cash
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

6.  GIVEN I am a Bank Customer on the Cash Deposit screen WHEN I enter
    valid card details and tap the \"Confirm Deposit\" button THEN the
    system initiates a secure request to the ATM Staging Service and,
    upon success, navigates me to the TBD: Staged Deposit Confirmation
    Screen.

7.  GIVEN I am a Bank Customer on the Cash Deposit screen WHEN I tap the
    \"Confirm Deposit\" button without entering any card details THEN
    the system displays the \"Card Details Required\" error message
    (M-01), and I remain on the Cash Deposit screen.

8.  GIVEN I have entered valid card details and tapped the \"Confirm
    Deposit\" button WHEN the ATM Staging Service is unavailable or
    returns a processing error THEN the system displays the \"Staging
    Failed\" error message (M-02), and I remain on the Cash Deposit
    screen.

9.  GIVEN I have tapped the \"Confirm Deposit\" button WHEN the system
    processes the request THEN a response (success or failure) must be
    displayed to me in under 3 seconds.

10. GIVEN the Card Details input field and \"Confirm Deposit\" button
    are displayed on the Cash Deposit screen WHEN they are inspected
    with an accessibility tool THEN they must meet WCAG 2.1 AA standards
    for the dark theme, including appropriate labels, contrast, and
    minimum touch target sizes.

11. GIVEN a staging request is sent to the ATM Staging Service WHEN the
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

12. GIVEN I am a Bank Customer on the ATM Cash Withdrawal screen WHEN I
    tap the Camera Icon and successfully scan a valid card THEN I am
    returned to the ATM Cash Withdrawal screen, the Card Details field
    is populated, and the process from scan completion to field
    population completes in under 3 seconds.

13. GIVEN I am a Bank Customer on the Cash Deposit screen WHEN I tap the
    Camera Icon and successfully scan a valid card THEN I am returned to
    the Cash Deposit screen, and the Card Details field is populated.

14. GIVEN I am using the card scanning interface launched from either
    the ATM Cash Withdrawal or Cash Deposit screen WHEN the scan fails
    due to poor lighting, an unreadable card, or I cancel the operation
    THEN the system displays the \"Scan Failed\" error message (M-01),
    and I am returned to the previous screen with the Card Details field
    remaining empty.

15. GIVEN the camera interface is launched for card scanning WHEN it is
    inspected with an accessibility tool THEN the camera overlay,
    on-screen instructions, and controls must comply with WCAG 2.1 AA
    standards.

16. GIVEN card details have been successfully scanned and populated into
    the Card Details field WHEN the application\'s memory is inspected
    THEN the raw card data is handled via a secure, tokenized process
    and is not stored in persistent device storage after the session is
    complete.

17. GIVEN I attempt to scan a standard, undamaged payment card under
    normal lighting conditions WHEN the scan is performed THEN the scan
    must succeed and populate the correct data with a success rate
    greater than 95%.
