using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace BoardingPass {
    public class BoardingPass  {

        private string input;
        private bool printDebug;
        protected int Row;
        protected int Column;
        protected int SeatId;

        public int getSeatId() { return this.SeatId; }

        public int getColumn()  { return this.Column; }

        public int getRow() { return this.Row; }

        public string getInput() { return this.input; }

        public BoardingPass(string inputLine, bool printDebug) {
            this.input = inputLine;
            this.printDebug = printDebug; 
            this.Row = FindRow(this.input);
            this.Column = FindColumn(this.input);
            this.SeatId = FindSeatId(this.Row, this.Column);
        }

        // public int Compare(BoardingPass x, BoardingPass y){
        //     return x.SeatId.CompareTo(y.SeatId);
        // }

        private int FindRow(string pass = null, decimal rangeLow = 0, decimal rangeHigh = 127, int tracker = 1) {
            
            if(pass is null){
                pass = Regex.Match(this.input, "(B|F){7}", RegexOptions.IgnoreCase).Value;
                if (this.printDebug) Console.WriteLine(pass);
            }
            
            decimal newRange  = Math.Round(((rangeHigh+rangeLow)/2));
            if(tracker < 7) {
                switch(pass[0]) {
                    case 'B':
                    if (this.printDebug) Console.WriteLine(String.Format("It was B - new Low Range: {0} and tracker is {1}", newRange, tracker++));
                    rangeLow = newRange;
                    break;
                    case 'F':
                    if (this.printDebug) Console.WriteLine(String.Format("It was F - new High Range: {0} and tracker is {1}", newRange, tracker++));
                    rangeHigh = newRange;
                    break;
                }
                return FindRow(pass.Substring(1), rangeLow, rangeHigh, tracker++);
            }
            return pass[0] == 'F' ? (int) rangeLow : (int) rangeHigh;
        }

        private int FindColumn(string pass = null, decimal rangeLeft = 0, decimal rangeRight = 7, int tracker = 1) {
            
            if(pass is null){
                pass = Regex.Match(this.input, "(L|R){3}", RegexOptions.IgnoreCase).Value;
                if (this.printDebug) Console.WriteLine(pass);
            }
            
            decimal newRange  = Math.Round(((rangeLeft+rangeRight)/2));
            if(tracker < 3) {
                switch(pass[0]) {
                    case 'L':
                    if (this.printDebug) Console.WriteLine(String.Format("It was L - new Low Range: {0} and tracker is {1}", newRange, tracker++));
                    rangeRight = newRange;
                    break;
                    case 'R':
                    if (this.printDebug) Console.WriteLine(String.Format("It was R - new High Range: {0} and tracker is {1}", newRange, tracker++));
                    rangeLeft = newRange;
                    break;
                }
                return FindColumn(pass.Substring(1), rangeLeft, rangeRight, tracker++);
            } 
            
            return pass[0] == 'L' ? (int) rangeLeft : (int) rangeRight;
            
        }

        private int FindSeatId(int row, int column) {
            return row*8+column;
        }
        
    }
}