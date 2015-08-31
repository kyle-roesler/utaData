rm( list=ls() )                                  # Clear memory

require( Lahman )                                # Data from Lahman sabermetric package

data( Master )                                   # Load player biography data to obtian birth year
head( Master[, 1:10])                            # Trust but verify

require( sqldf  )                                # This package aloows us to use Structured Query
                                                 # Language to manipulte data frames

query <- paste( "SELECT playerId,",              # This is the SQL quesry used to locate
                       "birthYear,",             # Michael Youngs Master row in the Master
                        "nameFirst,",            # table by his first and last name.
                        "nameLast",
                "FROM Master",
                "WHERE nameLast='Young'",
                  "AND nameFirst='Michael'" )

YoungMaster <- sqldf( query  )                   # Execute query against master table.
head( YouingMaster )                             # Verify answer.

data( Batting )                                  # Obtain career batting records.
head( Batting )                                  # Verify result.

query = paste( "SELECT *",                       # This query findd and loads all the yearly batting 
               "FROM YoungMaster,",              # rows that have Mr. Young's battingID.
                     "Batting",
               "WHERE YoungMaster.playerID = ",
                      "Batting.playerID" )

YoungBatting <- sqldf( query )                  # Execute query

rm( list=c( "Master", "Batting") )              # Recover memory by discarding data frames no 
                                                # longer needed.

YoungBatting$age <-                             # Compute age for each season.
  with( YoungBatting, 
        yearID - birthYear )

YoungBatting$OBP <-                             # Compute Young's onbase percentage.
  with( YoungBatting, 
        ( H + BB + IBB + HBP ) / 
          ( AB + BB + IBB + HBP) )       

YoungBatting$SLG <-                            # Cpmpute Young's slugging percentage.
  with( YoungBatting,
        ( H + X2B + 2 * X3B + HR ) /
          AB )

YoungBatting$OBPS <-                           # Compute Youngs onbase plus 
  with( YoungBatting, OBP + SLG)               # plus slugging percentage

require( ggplot2 )                             # Needed for graphics grammar plots

ggplot( YoungBatting,                          # Specify the data source
        aes( x=age, y=OBPS )) +                # Set predictor and response variables.
  
  geom_point() +                               # Plot data points.
  
  geom_smooth( method=loess,                   # Plot loess smoother.
               color="red" ) +
  
  geom_smooth( method=lm,                      # Plot OLS quadratic estimate
               formula=y~poly(x,2),
               raw=TRUE,
               colour="blue") +
  xlab("Age") +
  ylab( "Onbase percentage plus slugging" ) +
  ggtitle( "Michael Young's Hitting Career"  )

YoungBatting$centeredAge <-                  # Compute centered age to minimize
  with( YoungBatting, age - mean( age ))     # collinearity problems  

quadraticFit <-                              # Fit and display fit quadratic model
  lm( OBPS ~ poly( centeredAge, 2 ),
      YoungBatting )
summary( quadraticFit )






         


