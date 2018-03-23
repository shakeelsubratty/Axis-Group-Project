package analysis;

public class UserEngagementResponse
{

    private int superUnengaged;
    private int unengaged;
    private int engaged;
    private int superEngaged;
    private int overallEngagement;

    public int getSuperUnengaged() {
        return superUnengaged;
    }

    public void setSuperUnengaged(int superUnengaged) {
        this.superUnengaged = superUnengaged;
    }

    public int getUnengaged() {
        return unengaged;
    }

    public void setUnengaged(int unengaged) {
        this.unengaged = unengaged;
    }

    public int getEngaged() {
        return engaged;
    }

    public void setEngaged(int engaged) {
        this.engaged = engaged;
    }

    public int getSuperEngaged() {
        return superEngaged;
    }

    public void setSuperEngaged(int superEngaged) {
        this.superEngaged = superEngaged;
    }

    public int getOverallEngagement() {
        return overallEngagement;
    }

    public void setOverallEngagement(int overallEngagement) {
        this.overallEngagement = overallEngagement;
    }


    public UserEngagementResponse(int v, int w, int x, int y, int z)
    {
        this.superUnengaged = v;
        this.unengaged = w;
        this.engaged = x;
        this.superEngaged = y;
        this.overallEngagement = z;
    }
}