using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using BoardingPass;

namespace Day5 {
    class Program {

        static void Main(string[] args)
        {
            string line;              
            List<BoardingPass.BoardingPass> passList = new List<BoardingPass.BoardingPass>();

            // Read the file and display it line by line.  
            System.IO.StreamReader file = new System.IO.StreamReader(@"C:\Proj\Personal\AdventOfCode\AdventOfCode2020\Day5\input.txt");  
            while((line = file.ReadLine()) != null)  
            {  
                passList.Add(new BoardingPass.BoardingPass(line, true));
            }  
        
            var manifest = new List<int>();
            //    passList = passList.Sort(x => x.getSeatId());
            foreach(var pass in passList){
                manifest.Add(pass.getSeatId());
            }

            var orderedManifest = manifest.OrderByDescending(i => i);
            Console.WriteLine(orderedManifest.FirstOrDefault());
            
            // Pt 2.
            
            var min = manifest.Min();
            var max = manifest.Max();

            var mySeat = ( (max + 1) * max - (min - 1) * min ) / 2 - manifest.Sum();
            Console.WriteLine("My seat is:", mySeat);
        }        
    }
}
