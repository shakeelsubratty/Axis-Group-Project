import java.util.ArrayList;

public class Participant {

    private int ID;
    private ArrayList<String> responses;
    private int sumOfLengths;
    private int numberOfResponses;
    private double engagementLevel;
    private double averageLength;
    private String stringLevel;

    public Participant(int ID, ArrayList<String> possibleResponses)
    {
        this.ID= ID;
        this.responses = possibleResponses;
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

    public double fetchAverage(){
        return averageLength;
    }

    public int getID()
    {
        return ID;
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
