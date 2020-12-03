package main

import (
	"fmt"
	"bufio"
	"os"
	"log"
	"regexp"
	// "bytes"
	"strconv"
	"strings"
)

func main() {

	var fileLoc = "input.txt"

	file, err := os.Open(fileLoc)
    if err != nil {
        log.Fatal(err)
    }
	defer file.Close()
	
	var pass = 0
	var fail = 0

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		if(pwChecker(scanner.Text())){
			pass++
		} else {
			fail++
		}
	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

	p := strconv.Itoa(pass)
	f := strconv.Itoa(fail)
	
	fmt.Println("------------------------------")
	fmt.Println("------------------------------")
	fmt.Printf("There are %s valid passwords \n", p)
	fmt.Printf("There are %s invalid passwords \n", f)
	fmt.Println("------------------------------")
	fmt.Println("------------------------------")
}
	
func check(e error) {
    if e != nil {
        panic(e)
    }
}

// Return true if password PASSES validation
func pwChecker(entry string) bool {
	r, _ := regexp.Compile("\\d+\\-\\d+")
	
	//Get the range to validate against
	c := r.FindString(entry)
	b, _ := strconv.Atoi(strings.Split(c, "-")[0])
	e, _ := strconv.Atoi(strings.Split(c, "-")[1])

	// Get the value of the letter validator
	n := len(c)
	l := string([]byte{entry[n+1]})
	
	// Get the PW
	a := []rune(entry)
	pw := string(a[n+4:len(entry)-1])

	// Get the occurances of letter
	ct := strings.Count(pw, l)

	// Determine if password is valid
	v := (ct >= b && ct <= e)
	state := fmt.Sprintf("%6v", "Failed")
	if(v) {
		state = fmt.Sprintf("%6v", "Valid")
	} 
	s := " | "
	// Pass/Fail | letter | count | range | password
	fmt.Println(state, s, l, s, fmt.Sprintf("%2v", ct), s, fmt.Sprintf("%5v", c), s, fmt.Sprintf("%20v", pw))
	return v
}