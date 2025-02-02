# Enchanted Lakes Estates.r

require(ggplot2)                                      # For graphics grammer

require(GGally)                                       # For graphics grammar scatterplot 
                                                      # matrix

require( car )                                        # For transformations
require( alr4 )                                       # For more transformations 

##############################################################################################
#                                                                                            #
# Read Enchnated Lakes Estates comma seperated variable and store results in the ELE data    #
# frame.                                                                                     #
#                                                                                            #
##############################################################################################

ELE <- read.csv( "Enchanted Lakes Estates.csv", 
                 header=TRUE )
head( ELE )

#############################################################################################
#                                                                                           #
# The describe routine computes the sample size, the mean, the datdard devation, the        #
# skewness, and the central kutosis of a sample.  It is located in the utaR folder.         #                                             #
#############################################################################################

source('~/utaR/describe.r')           

##############################################################################################
#                                                                                            #
# Remove variables not used in the analysis.  This includes the city of Arlington and the    #
# data I recoreded the housing data from Zillow.                                             #
#                                                                                            #
##############################################################################################

ELE <- ELE[,c(1:2, 5:11)]
head(ELE) 

##############################################################################################
#                                                                                            #
# PLot histogram and density plot for appraised values. Also compute fhe descriptive         #
# statistics of the appraised price.                                                         #
#                                                                                            #
##############################################################################################

ggplot( ELE, aes( x=price )) +
  geom_histogram( aes(y=..density..), 
                  binwidth=100,  fill="white", colour="black" ) +
  geom_density() +
  geom_rug() +
  xlab("Price ($K) ") +
  ylab( "Density" ) +
  ggtitle( "Enchanted Lakes Estates Zillow Appraised Property Values" )

with( ELE, describe( price ))
( temp <- with( ELE, summary( price )))
( ratio <- temp[6]/ temp[1])

##############################################################################################
#                                                                                            #
# Analyze distribution of square feet.                                                       #                                                
#                                                                                            #
##############################################################################################

ggplot( ELE, aes( x=sqft )) +
  geom_histogram( aes(y=..density..), 
                  binwidth=500,  fill="white", colour="black" ) +
  geom_density( colour="blue" ) +
  geom_rug() +
  xlab( "House size (SQuare Feet)" ) +
  ylab( "Density" ) +
  ggtitle( "Enchanted Lakes Estates House Sizes " )

with( ELE, describe( sqft ))
( temp <- with( ELE, summary( sqft )))
( ratio <- temp[6]/ temp[1])

#############################################################################################
#                                                                                           #
# Investigate a power transformation that will give a linear relationship between sqft and  #
# price. We use the the function to find the value of lambda that minimizes residuals sums  #
# of squares. The power transformations are then implied by using the following table       #
#                                                                                           #
#                            lambda          Transformation                                 #
#                             -2.00           tx <- x^-2 provided X>0                       #
#                             -1.00           tx <- x^-1 provided X>0                       #
#                              0.00           tx <- log(x) provided x >0                    #
#                              0.25           tx <- x^(1/4)                                 #
#                              0.33           tx <- x^(1/3)                                 #
#                              0.50           tx <- x^(1/2)                                 #
#                              1.00           No transformation needed                      #
#                              2.00           tx <- X^2                                     #
#                                                                                           #
#############################################################################################

with( ELE, invTranPlot(  sqft, price  ))


#############################################################################################
#                                                                                           #
#  We draw a scatter plot between the appraised price of the house.  To this scatterplot    #
#  we add a fitted OLS regression line, and a smoothed loess line.                          #
#                                                                                           #
#############################################################################################

ggplot( ELE, aes( x=sqft, y=price )) +
  geom_smooth( method=lm, se=FALSE, colour="black"  ) +
  geom_smooth( method=loess, colour="red" ) +
  geom_point( aes( colour=street  ) ) +
  xlab( "House size (Square feet )" ) +
  ylab( "Price ($K)" ) +
  ggtitle(  "Enchanted Lakes Estates: Price versus House Size" )


#############################################################################################
#                                                                                           #
# Investigate a power transformation that will give a linear relationship between sqft and  #
# price. We use the the function to find the value of lambda that minimizes residuals sums  #
# of squares. The power transformations are then implied by using the following table       #
#                                                                                           #
#                            lambda          Transformation                                 #
#                             -2.00           tx <- x^-2 provided X>0                       #
#                             -1.00           tx <- x^-1 provided X>0                       #
#                              0.00           tx <- log(x) provided x >0                    #
#                              0.25           tx <- x^(1/4)                                 #
#                              0.33           tx <- x^(1/3)                                 #
#                              0.50           tx <- x^(1/2)                                 #
#                              1.00           No transformation needed                      #
#                              2.00           tx <- X^2                                     #
#                                                                                           #
#############################################################################################

with( ELE, invTranPlot(  sqft, price  ))



###########################################################################################
#                                                                                         #
# Draw histograms of beedrooms                                                            #
#                                                                                         #
###########################################################################################

ggplot( ELE, aes( x=bedrooms  )) +
  geom_histogram( aes(y=..density..  ),
                  binwidth=1, colour="black", fill="white" ) +
  geom_density( colour="red" ) +
  xlab( "Bedrooms" ) +
  ylab(  "Density" ) +
  ggtitle( "Enchanted Lakes Estates: Bedrooms" )

##########################################################################################
#                                                                                        #
# Compute discriptive statistics for bedrooms accrosss the entire sample                 #
#                                                                                        #
##########################################################################################

( momentsSummary  <- with( ELE, describe( bedrooms )))
( quantileSummary <- with( ELE, summary( bedrooms )))
( maxminRatio    <- quantileSummary[6]  / quantileSummary[1] )

##########################################################################################
#                                                                                        #
# Scatterplot of square feet versus bedrooms                                             #
#                                                                                        #
##########################################################################################

ggplot( ELE, aes( x=bedroom, y=sqft  )) +
  geom_smooth( method=lm, se=FALSE ) +
  geom_smooth( method=loess, se=FALSE, colour="red" ) +
  geom_point( aes( x=bedroom, y=sqft, colour=street )) +
  xlab( "Bedrooms" ) +
  ylab( "Housesize (Square feet)" ) +
  ggtitle( "Enchantet Lakes Estates: House size versus number of bed rooms "  )


########################################################################################
#                                                                                      #
# Display distribution of bathrooms                                                    #
#                                                                                      #
########################################################################################

ggplot( ELE, aes( x=baths ) ) +
  geom_histogram( aes( y=..density.. ), 
                  binwidth=0.5, 
                  colour="black", 
                  fill="white" ) +
  geom_density() +
  xlab( "Bathrooms" ) +
  ylab( "Density" ) +
  ggtitle(  "Enchnated Lake Estates: Bathrooms" )

########################################################################################
#                                                                                      #
# The Box-Cos transformation attempts to take non-normally distributed data and        #
# transform it it to normally distributed.  We will use the functions that are         #
# in the alr4 package which is desigend to support Sanford Weisberg's 4th edition      #
# of APPLIED LINEAR REGRESSION.                                                        #
#                                                                                      #
########################################################################################

                

continuousPredictors <- with( ELE, matrix( cbind( sqft, bedrooms, baths), ncol=3 ))

(lambdas<-powerTransform( continuousPredictors ))

testTransform( lambdas, c(1, -0.5, -0.5 ) )

ELE$trBedrooms <- with( ELE, bedrooms^-0.5 )
ELE$trBaths    <- with( ELE, baths^-0.5)

fit <- lm( price ~ street + sqft + trBedrooms + trBaths + corner + pool + foreclosed, data=ELE   )
summary( fit  )
