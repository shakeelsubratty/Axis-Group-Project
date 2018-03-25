package analysis;

import java.util.ArrayList;
import java.util.List;

public class UserEngagementResponse
{

    private double superUnengaged;
    private double unengaged;
    private double engaged;
    private double superEngaged;
    private double overallEngagement;

    public List<Double> getEngagementResponse() {
        return engagementResponse;
    }

    public void setEngagementResponse(List<Double> engagementResponse) {
        this.engagementResponse = engagementResponse;
    }

    private List<Double> engagementResponse;

    public double getSuperUnengaged() {
        return superUnengaged;
    }

    public void setSuperUnengaged(int superUnengaged) {
        this.superUnengaged = superUnengaged;
    }

    public double getUnengaged() {
        return unengaged;
    }

    public void setUnengaged(int unengaged) {
        this.unengaged = unengaged;
    }

    public double getEngaged() {
        return engaged;
    }

    public void setEngaged(int engaged) {
        this.engaged = engaged;
    }

    public double getSuperEngaged() {
        return superEngaged;
    }

    public void setSuperEngaged(int superEngaged) {
        this.superEngaged = superEngaged;
    }

    public double getOverallEngagement() {
        return overallEngagement;
    }

    public void setOverallEngagement(int overallEngagement) {
        this.overallEngagement = overallEngagement;
    }


    public UserEngagementResponse(ArrayList<Double> arr)
    {
        this.superUnengaged = arr.get(0);
        this.unengaged = arr.get(1);
        this.engaged = arr.get(2);
        this.superEngaged = arr.get(3);
        this.overallEngagement = arr.get(4);

//        engagementResponse.add(superUnengaged);
//        engagementResponse.add(unengaged);
//        engagementResponse.add(engaged);
//        engagementResponse.add(superEngaged);

    }
}