package hello;

public class UserEngagementResponse
{

    private int superUnengaged;
    private int unengaged;
    private int engaged;

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

    private int superEngaged;

    public UserEngagementResponse(int x, int y, int z, int w)
    {
        this.superUnengaged = x;
        this.unengaged = y;
        this.engaged = z;
        this.superEngaged = w;
    }
}