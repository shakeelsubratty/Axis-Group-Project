import static org.junit.Assert.*;

import org.junit.Test;

import analysis.UserEngagementCalculator;
import analysis.Participant;

import java.util.ArrayList;
import java.util.List;

import data.Response;


public class UserEngagementTest
{


/**
*Tests UserEngagementCalculator
*constructor
*
*/
@Test
public void testUserEngageCalculator()
{
		List<Response> a = new ArrayList<Response>();
		Participant p1 = new Participant("Shakeel", a);

		List<Response> b = new ArrayList<Response>();
		b.add(new Response("abcdefg"));
		b.add(new Response("abcdefghi"));
		Participant p2 = new Participant("Teddy", b);

		List<Participant> participants = new ArrayList<Participant>();
		participants.add(p1);
		participants.add(p2);

    UserEngagementCalculator testEngage = new UserEngagementCalculator(participants);
    assertEquals(8.0, testEngage.getWorkshopAv() , 0.01);
    assertEquals(2.0,testEngage.getTotalResp() , 0.01);
    assertEquals(2.0,testEngage.getNumPart() , 0.01);

}
/**
* Tests if calculates the correct
*EngagementLevel
*
*/
@Test
  public void testCalculateLevel()
  {
        List<Response> test1 = new ArrayList<Response>();
		test1.add(new Response("Iasdfghjkl"));
		test1.add(new Response("sdfshueksl"));
		test1.add(new Response("Iasdfghj"));
		test1.add(new Response("Iasdfghjkll"));
        //test1.add(new Response("Iasdfghjkll"));
      Participant p1Test = new Participant("Teddy", test1);

		List<Response> test2 = new ArrayList<Response>();
		test2.add(new Response("diafhkdshfagsefbjeas"));
		test2.add(new Response("fhausidgf9asg"));
		test2.add(new Response("ajdfbailsd"));
		test2.add(new Response("aisdhfjasvdfh"));
		test2.add(new Response("asbefaysgdkfh"));
		test2.add(new Response("asfdsgduf"));
		Participant p2Test = new Participant("Shakeel", test2);

		List<Response> test3 = new ArrayList<Response>();
		test3.add(new Response("abcd"));
		Participant p3Test = new Participant("Lewis", test3);

		List<Response> test4 = new ArrayList<Response>();
		test4.add(new Response("testtesttest123testtest1231"));
		test4.add(new Response("atestthisisatestthisisa"));
		test4.add(new Response("tthisisatestthisisatestthisisatestthisis"));
		test4.add(new Response("thisisates"));
		Participant p4Test = new Participant("Aaron", test4);

		List<Participant> participantsTest = new ArrayList<Participant>();
		participantsTest.add(p1Test);
		participantsTest.add(p2Test);
		participantsTest.add(p3Test);
		participantsTest.add(p4Test);

		UserEngagementCalculator tester = new UserEngagementCalculator(participantsTest);
		tester.calculateLevel();

    for (Participant x: participantsTest)
    {
      if ((x.getID()).equals("Teddy"))
      {
        assertTrue((x.getStringLevel()).equals("Unengaged"));
      }
      else if ((x.getID()).equals("Shakeel"))
      {
          assertTrue((x.getStringLevel()).equals("Engaged"));
      }

      else if ((x.getID()).equals("Lewis"))
      {
          assertTrue((x.getStringLevel()).equals("Terrible - must fire!"));
      }

      else if ((x.getID()).equals("Aaron"))
      {
          assertTrue((x.getStringLevel()).equals("Superstar- give them a raise!"));
      }
    }

  }
//
  /**
  * Tests if returns the correct percentages
  *
  */
  @Test
  public void calculateReturnAverageArr()
  {

  List<Response> test5 = new ArrayList<Response>();
  test5.add(new Response("Iasdfghjkl"));
  test5.add(new Response("sdfshueksl"));
  test5.add(new Response("Iasdfghj"));
  test5.add(new Response("Iasdfghjkll"));
  //test5.add(new Response("Iasdfghjkll"));
  Participant p5Test = new Participant("Tala", test5);

  List<Response> test6 = new ArrayList<Response>();
  test6.add(new Response("diafhkdshfagsefbjeas"));
  test6.add(new Response("fhausidgf9asg"));
  test6.add(new Response("ajdfbailsd"));
  test6.add(new Response("aisdhfjasvdfh"));
  test6.add(new Response("asbefaysgdkfh"));
  test6.add(new Response("asfdsgduf"));
  Participant p6Test = new Participant("Manuel", test6);

  List<Response> test7 = new ArrayList<Response>();
  test7.add(new Response("abcd"));
  Participant p7Test = new Participant("Alex", test7);

  List<Response> test8 = new ArrayList<Response>();
  test8.add(new Response("testtesttest123testtest1231"));
  test8.add(new Response("atestthisisatestthisisa"));
  test8.add(new Response("tthisisatestthisisatestthisisatestthisis"));
  test8.add(new Response("thisisates"));
  Participant p8Test = new Participant("David", test8);

  List<Participant> participantsTest1 = new ArrayList<Participant>();
  participantsTest1.add(p5Test);
  participantsTest1.add(p6Test);
  participantsTest1.add(p7Test);
  participantsTest1.add(p8Test);

  UserEngagementCalculator tester1 = new UserEngagementCalculator(participantsTest1);
  tester1.calculateLevel();
  List<Double> compare = tester1.returnAverageArr();

  assertEquals(0.25 ,compare.get(0), 0.01);
  assertEquals(0.25, compare.get(1),  0.01 );
  assertEquals(0.25, compare.get(2),  0.01);
  assertEquals(0.25, compare.get(3),  0.01);


  }


}
