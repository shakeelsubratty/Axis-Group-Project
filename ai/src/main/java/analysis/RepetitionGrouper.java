package analysis;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import data.Constants;
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
		groups = new ArrayList<>();
	}

	/**
	 * 
	 * @param r
	 *            the response to be added
	 */
	public void addResponse(Response r)
	{
		responses.add(r);

		// Create a new group if this response is the first response to be added.
		if (responses.size() == 1)
		{
			ArrayList<Response> newGroup = new ArrayList<>();
			r.setGroupID(UUID.randomUUID().toString());
			newGroup.add(r);
			groups.add(newGroup);
		}
		else // Find best group for the response that is being added
		{
			List<Response> bestGroup = null;
			double bestMatch = 0;

			// Iterate through groups
			for (int i = 0; i < groups.size(); i++)
			{
				List<Response> currentGroup = groups.get(i);

				double averageMatch = 0;

				// Iterate through responses in group and get match percentage
				for (int j = 0; j < currentGroup.size(); j++)
				{
					Response currentResponse = currentGroup.get(j);

					double temp = r.getMatchPercentage(currentResponse);

					averageMatch += temp;
				}

				averageMatch /= currentGroup.size();

				// If this group is the best match and it meets the minimum match percentage,
				// save the group as the best match
				if (averageMatch > bestMatch && averageMatch > Constants.MATCH_PERCENTAGE)
				{
					bestGroup = currentGroup;
				}
			}

			// If no matching group was found, add the response to a new group
			if (bestGroup == null)
			{
				ArrayList<Response> newGroup = new ArrayList<>();
				r.setGroupID(UUID.randomUUID().toString());
				newGroup.add(r);
				groups.add(newGroup);
			}
			else // Add the response to the best matching group that was found
			{
				r.setGroupID(bestGroup.get(0).getGroupID());
				bestGroup.add(r);
			}
		}
	}

	/**
	 * 
	 * @return the grouped responses
	 */
	public List<List<Response>> getGroups()
	{
		return groups;
	}

}
