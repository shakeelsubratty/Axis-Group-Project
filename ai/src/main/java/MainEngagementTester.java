import java.util.ArrayList;

public class MainEngagementTester {

    public static void main(String [] args)
    {
       ArrayList<String> a = new ArrayList<String>();
		Participant p1 = new Participant(0, a, 0.0 );

		ArrayList<String> b = new ArrayList<String>();
		b.add("abcdefg");
		b.add("abcdefghi");
		Participant p2 = new Participant(1, b, 15.0 );
		
		ArrayList<String> c = new ArrayList<String>();
		c.add("abcdefghijkl");
		Participant p3 = new Participant(2, c, 6.0 );
		
		ArrayList<String> d = new ArrayList<String>();
		d.add("abcdefghijklz");
		d.add("abcdefghijklz");
		d.add("abcdefghijklz");
		Participant p4 = new Participant(3, d, 2.5 );

		
		ArrayList<String> e = new ArrayList<String>();
		e.add("abcdefghijklzabc");
		Participant p5 = new Participant(4, e, 80.9 );

	
		ArrayList<String> f = new ArrayList<String>();
		f.add("abcdefghij");
		Participant p6 = new Participant(5, f, 10.0 );

		
		ArrayList<String> g = new ArrayList<String>();
		g.add("abcd");
		Participant p7 = new Participant(6, g, 11.3 );

		
		ArrayList<Participant> participants = new ArrayList<Participant>();
		participants.add(p1);
		participants.add(p2);
		participants.add(p3);
		participants.add(p4);
		participants.add(p5);
		participants.add(p6);
		participants.add(p7);
		
		UserEngagementCalculator test1 = new UserEngagementCalculator(participants);
		test1.calculateLevel();
				
	for (Participant example: participants)
	{
		System.out.println("The Engagement Level of participant with ID: " + example.getID() + " is " + example.getLevel());
	}
	
	double finalSum = 0.0;

	for (Participant ex: participants)
	{
		 finalSum += ex.getLevel();
	}
	
	 System.out.println(finalSum);

		System.out.println((test1.returnAverageArr()));

	}
	

}
