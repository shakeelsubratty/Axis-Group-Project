package analysis;

import java.text.DecimalFormat;
import java.util.List;
import java.util.ArrayList;

import analysis.Participant;

public class UserEngagementCalculator {

	private List<Participant> participants;
	private double numParticipants;
	private double workshopTotalResp;
	private double workshopAverage;
	private double midBad;
	private double mid;
	private double upperMid;
	private double numEngaged;

	public UserEngagementCalculator(List<Participant> x)
	{
     	participants = x;
		numParticipants = participants.size();
		if (participants.size()!=0)
		{
			for (Participant z: participants)
			{
				workshopTotalResp += z.getNumResponses();
			}
		}
		else
		{
			workshopTotalResp= 0;
		}

		for (Participant z: participants)
		{
			workshopAverage += (z.computeAverage()*z.getNumResponses());
		}
		workshopAverage = workshopAverage/workshopTotalResp;

		mid= 1/numParticipants;
		midBad=mid/2;
		upperMid= mid + midBad;
	}

	public void calculateLevel(){
		for (Participant y: participants)
		{
			double numerator =  (y.getNumResponses()/workshopTotalResp) ;
			double denominator = y.fetchAverage()/workshopAverage ;
            double finalLevel = numerator*denominator;

			y.setLevel(finalLevel);

			if ((0<= finalLevel) && (finalLevel< midBad))
			{
				y.setStringLevel("Terrible - must fire!");
			}
			else if ((midBad<= finalLevel) && (finalLevel< mid))
			{
				y.setStringLevel("Unengaged");
			}
			else if ((mid<= finalLevel) && (finalLevel< upperMid))
			{
				y.setStringLevel("Engaged");
			}
			else if ((upperMid<= finalLevel) && (finalLevel<= 1))
			{
				y.setStringLevel("Superstar- give them a raise!");
			}
			else
			{
				y.setStringLevel("None");
			}

		}

	}

	public double calculateOverAllEngagement()
	{
		for (Participant x: participants)
		{
			if (((x.getStringLevel()).equals("Engaged"))|| ((x.getStringLevel()).equals("Superstar- give them a raise!")))
			{
				numEngaged++;
			}
		}
		double percentage = ((numEngaged/numParticipants));
		DecimalFormat df = new DecimalFormat("##.####");
		percentage = Double.valueOf(df.format(percentage));
		return percentage;
	}


	public ArrayList<Double> returnAverageArr()
	{
		double numTerrible = 0.0;
		double numUn = 0.0;
		double numEng = 0.0;
		double numSuper = 0.0;

		for (Participant x: participants)
		{
			if (x.getStringLevel().equals("Terrible - must fire!"))
			{
				numTerrible++;
			}

			else if (x.getStringLevel().equals("Unengaged"))
			{
				numUn++;
			}
			else if (x.getStringLevel().equals("Engaged"))
			{
				numEng++;
			}
			else if (x.getStringLevel().equals("Superstar- give them a raise!"))
			{
				numSuper++;
			}
		}

		if(numParticipants != 0)
		{
			numTerrible = numTerrible/numParticipants;
			numUn = numUn/numParticipants;
			numEng = numEng/numParticipants;
			numSuper = numSuper/numParticipants;
		}
		else
		{
			numTerrible = 0.0;
			numUn = 0.0;
			numEng = 0.0;
			numSuper = 0.0;
		}


		DecimalFormat df = new DecimalFormat("##.####");

		ArrayList<Double> retArrList = new ArrayList<Double>();
		retArrList.add(Double.valueOf(df.format(numTerrible)));
		retArrList.add(Double.valueOf(df.format(numUn)));
		retArrList.add(Double.valueOf(df.format(numEng)));
		retArrList.add(Double.valueOf(df.format(numSuper)));
		retArrList.add(calculateOverAllEngagement());

		return retArrList;
	}


	public double getWorkshopAv()
	{
		return workshopAverage;
	}

	public double getTotalResp()
	{
		return workshopTotalResp;
	}

	public double getNumPart()
	{
		return numParticipants;
	}




}
