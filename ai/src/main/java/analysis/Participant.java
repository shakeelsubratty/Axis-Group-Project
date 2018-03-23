package analysis;

import java.util.List;
import data.Response;

public class Participant
{
    private final long id;
    private List<String> responses;

    private int sumOfLengths;
    private int numberOfResponses;
    private double engagementLevel;
    private double averageLength;
    private String stringLevel;

    public Participant(long id, List<String> responses)
    {
        this.id = id;
        this.responses = responses;
        numberOfResponses = responses.size();

    }

    public double computeAverage()
    {

        for (String x: responses)
        {
            sumOfLengths += x.length();
        }

        if (responses.size()!=0)
        {
            averageLength = ( sumOfLengths /( responses.size() ));
        }

        return averageLength;
    }

    public long getID(){return id;}

    public List<String> getResponses() {return responses;}

    public double fetchAverage(){
        return averageLength;
    }

    public int getNumResponses()
    {
        return responses.size();
    }

    public void setLevel(double x)
    {
        engagementLevel = x;
    }

    public double getLevel()
    {
        return engagementLevel;
    }

    public double getSize()
    {
        return responses.size();
    }

    public void setStringLevel(String a)
    {
        stringLevel=a;
    }

    public String getStringLevel()
    {
        return stringLevel;
    }

}