package deprecated;
import java.util.ArrayList;

public class Category {
	
	private ArrayList<String> categories;
	private ArrayList<Integer> groups;
	
	public Category()
	{
		categories = new ArrayList<>();
		groups = new ArrayList<>();
	}
	
	public Category(ArrayList<String> categories, ArrayList<Integer> groups)
	{
		this.categories = categories;
		this.groups = groups;
	}

	public ArrayList<String> getCategories()
	{
		return categories;
	}

	public void setCategories(ArrayList<String> categories)
	{
		this.categories = categories;
	}

	public ArrayList<Integer> getGroups()
	{
		return groups;
	}

	public void setGroups(ArrayList<Integer> groups)
	{
		this.groups = groups;
	}
	
}
