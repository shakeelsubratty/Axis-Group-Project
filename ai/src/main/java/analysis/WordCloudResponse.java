package analysis;

import java.util.List;
import java.util.Map;

import data.Word;


public class WordCloudResponse
{

    private Map<String,Word> cloud;

    public WordCloudResponse(Map<String,Word> cloud)
    {
        this.cloud = cloud;
    }

    public Map<String, Word> getCloud() {
        return cloud;
    }

    public void setCloud(Map<String, Word> cloud) {
        this.cloud = cloud;
    }

}