# Compute Team Offensive Statistics.r

require( Lahman )                                   # Obtain Lahman database package
data( Teams )                                       # Make Teams avaible for analysis
head( Teams )                                       # Show first 6 rows
tail( Teams )                                       # and last 6 rows


Teams <- Teams[ Teams$yearID > 1999, ]              # Only use temas since 2000
head( Teams )                                       # Confirm row deletion   
tail( Teams )                            

Teams$batAvg <- with( Teams, ( H / AB ))            # Compute batting average
Teams$OBP    <- with( Teams,                        # Compute onbase percentage
                  ( H + BB +HBP  ) /     
                  ( AB + BB + HBP + SF ))
Teams$SLG    <- with( Teams,                        # Compute slugging percentage
                      ( H+X2B+2*X3B +3*HR)/ AB )
Teams$OBSP  <- with( Teams, OBP+SLG )              # Compute onbase percentage plus slugging percentage
Teams$OBST  <- with( Teams, OBP*SLG )  

Sabermetrics <- with( Teams, data.frame( 
                      yearID, 
                      teamID, 
                      W, 
                      L,  
                      batAvg, 
                      OBP,
                      SLG, 
                      OBSP,
                      OBST,
                      R ))
save( Sabermetrics, file="Sabermetrics.rda" )

require( GGally )
ggpairs( Sabermetrics[5:10] )
