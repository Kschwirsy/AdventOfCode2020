
package AdventOfCode2020.Day6;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Day6 {
    
    public static void main(String[] args) {
        
        BufferedReader reader;
        var groups = new ArrayList<ArrayList<String>>();
        var group = new ArrayList<String>();
        try{
            reader = new BufferedReader(new FileReader("AdventOfCode2020/Day6/input.txt"));
            String line = reader.readLine();
            while(line != null){
                if (line.isEmpty()) {
                    groups.add(group);
                    group = new ArrayList<String>(); 
                    line = reader.readLine();
                    continue;
                }
                group.add(line);
                line = reader.readLine();
            }
            groups.add(group);
        } catch (IOException e) {

        }

        ArrayList<Integer> answers = new ArrayList<>();

        for (var grp : groups) {
            var allAnswers = grp.toString().replaceAll(",", "").replaceAll("\\[", "").replaceAll("\\]", "");
            StringBuilder sb = new StringBuilder();
            allAnswers.chars().distinct().forEach(c -> sb.append((char) c));
            allAnswers = sb.toString();
            allAnswers =allAnswers.replaceAll(" ","");
            answers.add(allAnswers.length());
        }

        var sum = 0;
        for (Integer integer : answers) {
            sum = sum + integer;
        }

        // Pt 2
        var groupSum = 0;
        for (var grp : groups) {
            var allAnswers = grp.toString().replaceAll(",", "").replaceAll("\\[", "").replaceAll("\\]", "").replaceAll(" ","").toCharArray();
            
            Map<Character, Integer> map = new HashMap<>();
            for(char c : allAnswers) 
            {
                if(map.containsKey(c)) {
                    int counter = map.get(c);
                    map.put(c, ++counter);
                } else {
                    map.put(c, 1);
                }
            }

            var grpCount = grp.size();
            var grpTotal = 0;
            for(char c : map.keySet()) {
                if(map.get(c) == grpCount) {
                    grpTotal++;
                }
            }
            groupSum = groupSum + grpTotal;
        }

        System.out.println(String.format("The answer to Pt1: %s", sum));
        System.out.println(String.format("The answer to Pt2: %s", groupSum));
    }
}
