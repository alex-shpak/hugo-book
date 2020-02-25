---
weight: 99
title: This is a layout test doc
---

# Doc Title

{{< columns >}}
This is content for col 1
<--->

This is content for col 2 - tabs inside a column:
{{< tabs "noneworkingtabs" >}}
{{< tab "Thing1" >}}This information on Thing1 does not appear.{{< /tab >}}
{{< tab "Thing2" >}}This information on Thing2 does not appear.{{< /tab >}}
{{< /tabs >}}

More content for col 2
{{< /columns >}}

Back to one wide col. Here are some tabs outside columns which work fine:

{{< tabs "workingtabs" >}}
{{< tab "Thing3" >}}This information on Thing3 is fine.{{< /tab >}}
{{< tab "Thing4" >}}This information on Thing4 is fine.{{< /tab >}}
{{< /tabs >}}

end of doc
