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
	fmt.Println("Pass:", p)
	fmt.Println("Fail", f)
}
	
func check(e error) {
    if e != nil {
        panic(e)
    }
}

// Return true if password passes validation
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

	v := (ct > b && ct < e)

	fmt.Println("--------------")
	fmt.Println("Input:", entry)
	fmt.Println("Low/High:", c)
	fmt.Println("Letter:", l)
	fmt.Println("Password:", pw)
	fmt.Println("Occurences:", ct)
	fmt.Println("Valid:", v)
	
	return v
}