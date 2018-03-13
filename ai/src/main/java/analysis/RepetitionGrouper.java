package analysis;

import java.util.ArrayList;
import java.util.List;
import data.Response;

/**
 * 
 * @author Aaron
 *
 *         Sorts similar responses into groups.
 */
public class RepetitionGrouper
{
	private List<Response> responses;
	private List<List<Response>> groups;

	/**
	 * RepetitionGrouper constructor
	 */
	public RepetitionGrouper()
	{
		responses = new ArrayList<>();
	}

	/**
	 * 
	 * @param r
	 *            the response to be added
	 * @return true if the response was added successfully.
	 */
	public boolean addResponse(Response r)
	{
		// TODO: Implement method and change groupResponses() to use this method. This
		// method should take a Response, compare it to all existing groups and insert
		// into the group with the highest match percentage (or add to a new group if
		// its match percentage is below the minimum match requirements).
		
		return responses.add(r);
	}

	/**
	 * 
	 * @param r
	 *            the response to be removed
	 * @return true if the response was removed successfully.
	 */
	public boolean removeResponse(Response r)
	{
		return responses.remove(r);
	}

	/**
	 * Group similar responses
	 * 
	 * @return the grouped responses
	 */
	public List<List<Response>> groupResponses()
	{
		// TODO: Remove all print statments
		if (responses.size() == 0)
		{
			return null;
		}
		else
		{
			groups = new ArrayList<>();

			// Add first response to first group
			ArrayList<Response> toAdd = new ArrayList<>();
			toAdd.add(responses.get(0));
			groups.add(toAdd);

			System.out.println("Response " + responses.get(0).toString() + " added to a new list.");

			if (responses.size() > 1)
			{
				// Loop through each response
				for (int i = 1; i < responses.size(); i++)
				{
					System.out.println("Comparing response " + i + " to...");
					boolean matchFound = false;
					int j = 0;

					// Store the current response
					Response currentResponse = responses.get(i);

					// Loop through the groups until a matching group is found
					while (!matchFound && j < groups.size())
					{
						// Store the current group
						List<Response> currentGroup = groups.get(j);

						// Only attempt to add if the group doesn't yet contain the current response
						if (!currentGroup.contains(currentResponse))
						{
							System.out.println("\tgroup " + j + "...");
							int matchCount = 0;

							// Loop through each response currently in the group
							for (int k = 0; k < currentGroup.size(); k++)
							{
								System.out.println("\t\tresponse " + k);
								Response toCompare = currentGroup.get(k);

								// Increment matchCount if a matching response is found
								if (toCompare.matches(currentResponse))
								{
									matchCount++;
								}
							}

							System.out.println((double) matchCount / currentGroup.size() * 100 + "% match ("
									+ matchCount + " matches).");

							// If at least 1 match was found and the % of matches meets the minimum
							// requirement defined in Constants.java, add to group
							if (matchCount > 0
									&& ((double) matchCount / currentGroup.size()) >= data.Constants.MATCH_PERCENTAGE)
							{
								matchFound = true;
								currentGroup.add(currentResponse);
								System.out.println(
										"\t\t\tAdding response" + currentResponse.toString() + " to group " + j);
							}
						}
						else
						{
							System.out.println("\tgroup " + j + " already contains response "
									+ currentResponse.toString() + " - skipping...");
						}
						j++;
					}

					// Add response to new group if a matching group isn't found.
					if (!matchFound)
					{
						ArrayList<Response> newList = new ArrayList<>();
						newList.add(currentResponse);
						groups.add(newList);

						System.out.println("*** No match found ***\nAdding response " + currentResponse.toString()
								+ " to a new group.");
					}
				}
			}

			return groups;
		}
	}
}
