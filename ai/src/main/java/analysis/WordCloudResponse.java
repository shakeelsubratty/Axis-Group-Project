package analysis;

import java.util.List;
import java.util.Map;

import data.Word;


public class WordCloudResponse
{

    private List<Word> cloud;

    public WordCloudResponse(HashMap<String,Word> map)
    {
        List<Word> l = new ArrayList<>();
        for(Word x : map.values())
        {
            l.add(x);
        }
        this.cloud = l;
    }

    public List<Word>  getCloud() {
        return cloud;
    }

    public void setCloud(List<Word> cloud) {
        this.cloud = cloud;
    }

}