module Day1 where
--For a mass of 12, divide by 3 and round down to get 4, then subtract 2 to get 2.
--For a mass of 14, dividing by 3 and rounding down still yields 4, so the fuel required is also 2.
--For a mass of 1969, the fuel required is 654.
--For a mass of 100756, the fuel required is 33583.

main :: IO ()
main = print "something"

string = "1234"


raw :: IO String
raw = readFile "puzzleInput.js"

strings :: IO [String]
strings = fmap lines raw

getMassRequirement :: String -> Int
getMassRequirement str = (read str `div` 3) - 2
                           
numbers :: IO [Int]
numbers = fmap (fmap getMassRequirement) strings

totalFuelNeeded :: IO Int
totalFuelNeeded = (fmap sum) numbers

