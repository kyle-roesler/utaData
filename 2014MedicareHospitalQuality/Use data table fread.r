# Read data using data.table

rm(list=ls())

require( data.table)

wd <- getwd()

inFile <- file.path( wd, "HOSPITAL_QUARTERLY_QUALITYMEASURE_IPFQR_HOSPITAL.csv" )

HQQM <- fread( inFile )
tables()

# Rename column names of desred fields


