# 記号とキーワード

ここに記載してある記号を今の時点で全て覚える必要は全くありません。これから多くのコードを読み書きする過程で知らない記号・キーワードに出会ったら、このページを思い出して一覧を見返してみてください。

### JavaScript由来の記号

<table>
  <thead>
    <tr>
      <th style="text-align:left">&#x8A18;&#x53F7;</th>
      <th style="text-align:left">&#x540D;&#x79F0;</th>
      <th style="text-align:left">&#x8AAC;&#x660E;</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">+</td>
      <td style="text-align:left">&#x5358;&#x9805;&#x6B63;&#x5024;&#x6F14;&#x7B97;&#x5B50;</td>
      <td style="text-align:left">
        <p>Number&#x578B;&#x306B;&#x5909;&#x63DB;&#x3057;&#x307E;&#x3059;&#x3002;
          <br
          />
        </p>
        <p>&#x4F8B;: +&apos;1&apos; =&gt; 1</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">+</td>
      <td style="text-align:left">&#x52A0;&#x7B97;&#x6F14;&#x7B97;&#x5B50;</td>
      <td style="text-align:left">2&#x3064;&#x306E;&#x5024;&#x3092;&#x8DB3;&#x3057;&#x7B97;&#x3057;&#x307E;&#x3059;&#x3002;</td>
    </tr>
    <tr>
      <td style="text-align:left">-</td>
      <td style="text-align:left">&#x5358;&#x9805;&#x8CA0;&#x5024;&#x6F14;&#x7B97;&#x5B50;</td>
      <td style="text-align:left">
        <p>&#x6B63;&#x8CA0;&#x3092;&#x53CD;&#x8EE2;&#x3057;&#x3066;Number&#x578B;&#x306B;&#x5909;&#x63DB;&#x3057;&#x307E;&#x3059;&#x3002;
          <br
          />
        </p>
        <p>&#x4F8B;: -&apos;1&apos; =&gt; -1</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">-</td>
      <td style="text-align:left">&#x6E1B;&#x7B97;&#x6F14;&#x7B97;&#x5B50;</td>
      <td style="text-align:left">2&#x3064;&#x306E;&#x5024;&#x3092;&#x5F15;&#x304D;&#x7B97;&#x3057;&#x307E;&#x3059;&#x3002;</td>
    </tr>
    <tr>
      <td style="text-align:left">/</td>
      <td style="text-align:left">&#x9664;&#x7B97;&#x6F14;&#x7B97;&#x5B50;</td>
      <td style="text-align:left">&#x5DE6;&#x306E;&#x5024;&#x3092;&#x53F3;&#x306E;&#x5024;&#x3067;&#x5272;&#x308A;&#x7B97;&#x3057;&#x307E;&#x3059;&#x3002;</td>
    </tr>
    <tr>
      <td style="text-align:left">*</td>
      <td style="text-align:left">&#x4E57;&#x7B97;&#x6F14;&#x7B97;&#x5B50;</td>
      <td style="text-align:left">&#x5DE6;&#x306E;&#x5024;&#x3068;&#x53F3;&#x306E;&#x5024;&#x3092;&#x639B;&#x3051;&#x7B97;&#x3057;&#x307E;&#x3059;&#x3002;</td>
    </tr>
    <tr>
      <td style="text-align:left">%</td>
      <td style="text-align:left">&#x5270;&#x4F59;&#x6F14;&#x7B97;&#x5B50;</td>
      <td style="text-align:left">&#x5DE6;&#x306E;&#x5024;&#x3092;&#x53F3;&#x306E;&#x5024;&#x3067;&#x5272;&#x3063;&#x305F;&#x4F59;&#x308A;&#x3092;&#x8A08;&#x7B97;&#x3057;&#x307E;&#x3059;&#x3002;</td>
    </tr>
    <tr>
      <td style="text-align:left">**</td>
      <td style="text-align:left">&#x3079;&#x304D;&#x4E57;&#x6F14;&#x7B97;&#x5B50;</td>
      <td style="text-align:left">
        <p>&#x5DE6;&#x306E;&#x5024;&#x3092;&#x53F3;&#x306E;&#x5024;&#x3067;&#x3079;&#x304D;&#x4E57;&#x3057;&#x307E;&#x3059;&#x3002;
          <br
          />
        </p>
        <p>&#x4F8B;: 2 ** 3 =&gt; 8</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">~</td>
      <td style="text-align:left">&#x30D3;&#x30C3;&#x30C8;&#x5426;&#x5B9A;&#x6F14;&#x7B97;&#x5B50;</td>
      <td
      style="text-align:left">
        <p>&#x30D3;&#x30C3;&#x30C8;&#x3092;&#x53CD;&#x8EE2;&#x3057;&#x307E;&#x3059;&#x3002;
          <br
          />
        </p>
        <p>&#x4F8B;:</p>
        <p>const a = 1; // 00000001</p>
        <p>console.log(~a) // 11111110</p>
        <p>// &#x51FA;&#x529B;: -2</p>
        </td>
    </tr>
    <tr>
      <td style="text-align:left">!</td>
      <td style="text-align:left">&#x8AD6;&#x7406;&#x5426;&#x5B9A;&#x6F14;&#x7B97;&#x5B50;</td>
      <td style="text-align:left">&#x771F;&#x5024;&#x3068;&#x507D;&#x5024;&#x3092;&#x53CD;&#x8EE2;&#x3057;&#x307E;&#x3059;&#x3002;</td>
    </tr>
    <tr>
      <td style="text-align:left">&lt;</td>
      <td style="text-align:left">&#x5C0F;&#x306A;&#x308A;&#x6F14;&#x7B97;&#x5B50;</td>
      <td style="text-align:left">&#x5DE6;&#x306E;&#x5024;&#x304C;&#x53F3;&#x306E;&#x5024;&#x3088;&#x308A;&#x3082;&#x5C0F;&#x3055;&#x3044;&#x304B;&#x5224;&#x5B9A;&#x3057;&#x307E;&#x3059;&#x3002;</td>
    </tr>
    <tr>
      <td style="text-align:left">&gt;</td>
      <td style="text-align:left">&#x5927;&#x306A;&#x308A;&#x6F14;&#x7B97;&#x5B50;</td>
      <td style="text-align:left">&#x5DE6;&#x306E;&#x5024;&#x304C;&#x53F3;&#x306E;&#x5024;&#x3088;&#x308A;&#x3082;&#x5927;&#x304D;&#x3044;&#x304B;&#x5224;&#x5B9A;&#x3057;&#x307E;&#x3059;&#x3002;</td>
    </tr>
    <tr>
      <td style="text-align:left">&lt;=</td>
      <td style="text-align:left">&#x5C0F;&#x306A;&#x308A;&#x30A4;&#x30B3;&#x30FC;&#x30EB;&#x6F14;&#x7B97;&#x5B50;</td>
      <td
      style="text-align:left">&#x5DE6;&#x306E;&#x5024;&#x304C;&#x53F3;&#x306E;&#x5024;&#x4EE5;&#x4E0B;&#x304B;&#x5224;&#x5B9A;&#x3057;&#x307E;&#x3059;&#x3002;</td>
    </tr>
    <tr>
      <td style="text-align:left">&gt;=</td>
      <td style="text-align:left">&#x5927;&#x306A;&#x308A;&#x30A4;&#x30B3;&#x30FC;&#x30EB;&#x6F14;&#x7B97;&#x5B50;</td>
      <td
      style="text-align:left">&#x5DE6;&#x306E;&#x5024;&#x304C;&#x53F3;&#x306E;&#x5024;&#x4EE5;&#x4E0A;&#x304B;&#x5224;&#x5B9A;&#x3057;&#x307E;&#x3059;&#x3002;</td>
    </tr>
    <tr>
      <td style="text-align:left">==</td>
      <td style="text-align:left">&#x7B49;&#x4FA1;&#x6F14;&#x7B97;&#x5B50;</td>
      <td style="text-align:left">
        <p>&#x5DE6;&#x306E;&#x5024;&#x3068;&#x53F3;&#x306E;&#x5024;&#x304C;&#x7B49;&#x3057;&#x3044;&#x304B;&#x5224;&#x5B9A;&#x3057;&#x307E;&#x3059;&#x3002;</p>
        <p>&#x578B;&#x304C;&#x7570;&#x306A;&#x308B;&#x5834;&#x5408;&#x306F;&#x578B;&#x5909;&#x63DB;&#x3055;&#x308C;&#x3066;&#x6BD4;&#x8F03;&#x3055;&#x308C;&#x307E;&#x3059;&#x3002;
          <br
          />
        </p>
        <p>&#x4F8B;: &apos;1&apos; == 1 =&gt; true</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">!=</td>
      <td style="text-align:left">&#x4E0D;&#x7B49;&#x4FA1;&#x6F14;&#x7B97;&#x5B50;</td>
      <td style="text-align:left">
        <p>&#x5DE6;&#x306E;&#x5024;&#x3068;&#x53F3;&#x306E;&#x5024;&#x304C;&#x7570;&#x306A;&#x308B;&#x304B;&#x5224;&#x5B9A;&#x3057;&#x307E;&#x3059;&#x3002;</p>
        <p>&#x578B;&#x304C;&#x7570;&#x306A;&#x308B;&#x5834;&#x5408;&#x306F;&#x578B;&#x5909;&#x63DB;&#x3055;&#x308C;&#x3066;&#x6BD4;&#x8F03;&#x3055;&#x308C;&#x307E;&#x3059;&#x3002;
          <br
          />
        </p>
        <p>&#x4F8B;: &apos;1&apos; != 1 =&gt; false</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">===</td>
      <td style="text-align:left">&#x53B3;&#x5BC6;&#x7B49;&#x4FA1;&#x6F14;&#x7B97;&#x5B50;</td>
      <td style="text-align:left">
        <p>&#x578B;&#x3092;&#x542B;&#x3081;&#x3066;&#x5DE6;&#x306E;&#x5024;&#x3068;&#x53F3;&#x306E;&#x5024;&#x304C;&#x7B49;&#x3057;&#x3044;&#x304B;&#x5224;&#x5B9A;&#x3057;&#x307E;&#x3059;&#x3002;
          <br
          />
        </p>
        <p>&#x4F8B;: &apos;1&apos; === 1 =&gt; false</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">!==</td>
      <td style="text-align:left">&#x53B3;&#x5BC6;&#x4E0D;&#x7B49;&#x4FA1;&#x6F14;&#x7B97;&#x5B50;</td>
      <td
      style="text-align:left">
        <p>&#x578B;&#x3092;&#x542B;&#x3081;&#x3066;&#x5DE6;&#x306E;&#x5024;&#x3068;&#x53F3;&#x306E;&#x5024;&#x304C;&#x7570;&#x306A;&#x308B;&#x304B;&#x5224;&#x5B9A;&#x3057;&#x307E;&#x3059;&#x3002;
          <br
          />
        </p>
        <p>&#x4F8B;: 1 === 2 =&gt; true</p>
        </td>
    </tr>
    <tr>
      <td style="text-align:left">&lt;&lt;</td>
      <td style="text-align:left">&#x30D3;&#x30C3;&#x30C8;&#x5DE6;&#x30B7;&#x30D5;&#x30C8;&#x6F14;&#x7B97;&#x5B50;</td>
      <td
      style="text-align:left">
        <p>&#x5DE6;&#x306E;&#x5024;&#x306E;&#x30D3;&#x30C3;&#x30C8;&#x3092;&#x53F3;&#x306E;&#x5024;&#x306E;&#x6570;&#x3060;&#x3051;&#x5DE6;&#x306B;&#x305A;&#x3089;&#x3057;&#x307E;&#x3059;&#x3002;
          <br
          />
        </p>
        <p>&#x4F8B;:</p>
        <p>const a = 1 // 00000001</p>
        <p>const b = 3</p>
        <p>console.log(a &lt;&lt; b) // 00001000</p>
        <p>// &#x51FA;&#x529B;: 8</p>
        </td>
    </tr>
    <tr>
      <td style="text-align:left">&gt;&gt;</td>
      <td style="text-align:left">&#x30D3;&#x30C3;&#x30C8;&#x53F3;&#x30B7;&#x30D5;&#x30C8;&#x6F14;&#x7B97;&#x5B50;</td>
      <td
      style="text-align:left">
        <p>&#x5DE6;&#x306E;&#x5024;&#x306E;&#x30D3;&#x30C3;&#x30C8;&#x3092;&#x53F3;&#x306E;&#x5024;&#x306E;&#x6570;&#x3060;&#x3051;&#x53F3;&#x306B;&#x305A;&#x3089;&#x3057;&#x307E;&#x3059;&#x3002;
          <br
          />
        </p>
        <p>&#x4F8B;:</p>
        <p>const a = 8 // 00001000
          <br />const b = 3</p>
        <p>console.log(a &gt;&gt; b) // 00000001</p>
        <p>// &#x51FA;&#x529B;: 1</p>
        </td>
    </tr>
    <tr>
      <td style="text-align:left">&gt;&gt;&gt;</td>
      <td style="text-align:left">&#x7B26;&#x53F7;&#x306A;&#x3057;&#x53F3;&#x30B7;&#x30D5;&#x30C8;&#x6F14;&#x7B97;&#x5B50;</td>
      <td
      style="text-align:left">
        <p>&#x5DE6;&#x306E;&#x5024;&#x306E;&#x30D3;&#x30C3;&#x30C8;&#x3092;&#x53F3;&#x306E;&#x5024;&#x306E;&#x6570;&#x3060;&#x3051;&#x53F3;&#x306B;&#x305A;&#x3089;&#x3057;&#x307E;&#x3059;&#x3002;</p>
        <p>&#x5DE6;&#x306B;&#x5165;&#x308B;&#x7B26;&#x53F7;&#x30D3;&#x30C3;&#x30C8;&#x306F;&#x5E38;&#x306B;
          0 &#x306B;&#x306A;&#x308A;&#x307E;&#x3059;&#x3002;</p>
        <p></p>
        <p>&#x4F8B;:
          <br />const a = -2 // 11111111111111111111111111111110</p>
        <p>const b = 3
          <br />console.log(a &gt;&gt;&gt; b) // 00011111111111111111111111111111</p>
        <p>// &#x51FA;&#x529B;: 536870911</p>
        </td>
    </tr>
    <tr>
      <td style="text-align:left">&amp;</td>
      <td style="text-align:left">&#x30D3;&#x30C3;&#x30C8;&#x8AD6;&#x7406;&#x7A4D;</td>
      <td style="text-align:left">
        <p>&#x5DE6;&#x306E;&#x5024;&#x3068;&#x53F3;&#x306E;&#x5024;&#x3067;&#x5171;&#x306B;&#x30D3;&#x30C3;&#x30C8;&#x304C;1&#x3067;&#x3042;&#x308B;&#x4F4D;&#x7F6E;&#x306E;&#x30D3;&#x30C3;&#x30C8;&#x3092;1&#x306B;
          <br
          />&#x3057;&#x307E;&#x3059;&#x3002;
          <br />
        </p>
        <p>&#x4F8B;:</p>
        <p>const a = 1 // 00000001</p>
        <p>const b = 5 // 00000101</p>
        <p>console.log(a &amp; b) // 00000001</p>
        <p>// &#x51FA;&#x529B;: 1</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">|</td>
      <td style="text-align:left">&#x30D3;&#x30C3;&#x30C8;&#x8AD6;&#x7406;&#x548C;</td>
      <td style="text-align:left">
        <p>&#x5DE6;&#x306E;&#x5024;&#x3068;&#x53F3;&#x306E;&#x5024;&#x3067;&#x3069;&#x3061;&#x3089;&#x306E;&#x30D3;&#x30C3;&#x30C8;&#x304C;1&#x3067;&#x3042;&#x308B;&#x4F4D;&#x7F6E;&#x306E;&#x30D3;&#x30C3;&#x30C8;&#x3092;1&#x306B;
          <br
          />&#x3057;&#x307E;&#x3059;&#x3002;
          <br />
        </p>
        <p>&#x4F8B;:</p>
        <p>const a = 1 // 00000001</p>
        <p>const b = 5 // 00000101</p>
        <p>console.log(a &amp; b) // 00000101</p>
        <p>// &#x51FA;&#x529B;: 5</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">^</td>
      <td style="text-align:left">&#x30D3;&#x30C3;&#x30C8;&#x6392;&#x4ED6;&#x7684;&#x8AD6;&#x7406;&#x548C;</td>
      <td
      style="text-align:left">
        <p>&#x5DE6;&#x306E;&#x5024;&#x3068;&#x53F3;&#x306E;&#x5024;&#x3067;&#x30D3;&#x30C3;&#x30C8;&#x306E;&#x5024;&#x304C;&#x7570;&#x306A;&#x308B;&#x4F4D;&#x7F6E;&#x306E;&#x30D3;&#x30C3;&#x30C8;&#x3092;1&#x306B;</p>
        <p>&#x3057;&#x307E;&#x3059;&#x3002;
          <br />
        </p>
        <p>&#x4F8B;:</p>
        <p>const a = 1 // 00000001</p>
        <p>const b = 5 // 00000101</p>
        <p>console.log(a &amp; b) // 00000100</p>
        <p>// &#x51FA;&#x529B;: 4</p>
        </td>
    </tr>
    <tr>
      <td style="text-align:left">&amp;&amp;</td>
      <td style="text-align:left">&#x8AD6;&#x7406;&#x7A4D;</td>
      <td style="text-align:left">&#x5168;&#x3066;&#x306E;&#x771F;&#x507D;&#x5024;&#x304C; true &#x306E;&#x3068;&#x304D;&#x306B;
        true &#x3092;&#x8FD4;&#x3057;&#x307E;&#x3059;&#x3002;
        <br />&#x305D;&#x3046;&#x3067;&#x306A;&#x3044;&#x5834;&#x5408;&#x306B; false
        &#x3092;&#x8FD4;&#x3057;&#x307E;&#x3059;&#x3002;</td>
    </tr>
    <tr>
      <td style="text-align:left">||</td>
      <td style="text-align:left">&#x8AD6;&#x7406;&#x548C;</td>
      <td style="text-align:left">
        <p>&#x4E00;&#x3064;&#x3067;&#x3082;&#x771F;&#x507D;&#x5024;&#x304C; true
          &#x306E;&#x3068;&#x304D;&#x306B; true &#x3092;&#x8FD4;&#x3057;&#x307E;&#x3059;&#x3002;</p>
        <p>&#x305D;&#x3046;&#x3067;&#x306A;&#x3044;&#x5834;&#x5408;&#x306B; false
          &#x3092;&#x8FD4;&#x3057;&#x307E;&#x3059;&#x3002;</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">??</td>
      <td style="text-align:left">Null&#x5408;&#x4F53;</td>
      <td style="text-align:left">
        <p>&#x5DE6;&#x306E;&#x5024;&#x304C; null &#x307E;&#x305F;&#x306F; undefined
          &#x306E;&#x6642;&#x306B;&#x53F3;&#x306E;&#x5024;&#x3092;&#x8FD4;&#x3057;&#x307E;&#x3059;&#x3002;</p>
        <p>&#x305D;&#x3046;&#x3067;&#x306A;&#x3044;&#x5834;&#x5408;&#x306F;&#x5DE6;&#x306E;&#x5024;&#x3092;&#x8FD4;&#x3057;&#x307E;&#x3059;&#x3002;</p>
        <p>
          <br />&#x4F8B;:</p>
        <p>console.log(undefined ?? 1) // 1</p>
        <p>console.log(2 ?? 1) // 2</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">a ? b : c</td>
      <td style="text-align:left">&#x6761;&#x4EF6;&#xFF08;&#x4E09;&#x9805;&#xFF09;&#x6F14;&#x7B97;&#x5B50;</td>
      <td
      style="text-align:left">
        <p>a&#x306E;&#x771F;&#x507D;&#x5024;&#x304C; true &#x306E;&#x5834;&#x5408;&#x306F;
          b &#x306E;&#x5024;&#x3092;&#x8FD4;&#x3057;&#x307E;&#x3059;&#x3002;</p>
        <p>a&#x306E;&#x771F;&#x507D;&#x5024;&#x304C; false &#x306E;&#x5834;&#x5408;&#x306F;
          c &#x306E;&#x5024;&#x3092;&#x8FD4;&#x3057;&#x307E;&#x3059;&#x3002;</p>
        </td>
    </tr>
    <tr>
      <td style="text-align:left">?.</td>
      <td style="text-align:left">&#x30AA;&#x30D7;&#x30B7;&#x30E7;&#x30CA;&#x30EB;&#x30C1;&#x30A7;&#x30A4;&#x30CB;&#x30F3;&#x30B0;</td>
      <td
      style="text-align:left">
        <p>&#x30D7;&#x30ED;&#x30D1;&#x30C6;&#x30A3;&#x306E;&#x30A2;&#x30AF;&#x30BB;&#x30B9;&#x5143;&#x304C;
          null &#x307E;&#x305F;&#x306F; undefined &#x306E;&#x3068;&#x304D;&#x306B;</p>
        <p>&#x30A8;&#x30E9;&#x30FC;&#x3092;&#x767A;&#x751F;&#x3055;&#x305B;&#x305A;&#x306B;
          undefined &#x3092;&#x8FD4;&#x3057;&#x307E;&#x3059;&#x3002;</p>
        <p></p>
        <p>&#x4F8B;:</p>
        <p>const user = null</p>
        <p>console.log(user.name) // Cannot read property &apos;name&apos; of null</p>
        <p>console.log(user?.name) // undefined</p>
        </td>
    </tr>
    <tr>
      <td style="text-align:left">=</td>
      <td style="text-align:left">&#x4EE3;&#x5165;&#x6F14;&#x7B97;&#x5B50;</td>
      <td style="text-align:left">&#x5DE6;&#x306E;&#x5909;&#x6570;&#x306B;&#x53F3;&#x306E;&#x5024;&#x3092;&#x5272;&#x308A;&#x5F53;&#x3066;&#x307E;&#x3059;&#x3002;</td>
    </tr>
    <tr>
      <td style="text-align:left">*=</td>
      <td style="text-align:left">&#x4E57;&#x7B97;&#x4EE3;&#x5165;</td>
      <td style="text-align:left">&#x5DE6;&#x306E;&#x5909;&#x6570;&#x306E;&#x5024;&#x3068;&#x53F3;&#x306E;&#x5024;&#x3092;&#x639B;&#x3051;&#x7B97;&#x3057;&#x305F;&#x7D50;&#x679C;&#x3092;&#x5DE6;&#x306E;&#x5909;&#x6570;&#x306B;
        <br
        />&#x5272;&#x308A;&#x5F53;&#x3066;&#x307E;&#x3059;&#x3002;</td>
    </tr>
    <tr>
      <td style="text-align:left">**=</td>
      <td style="text-align:left">&#x3079;&#x304D;&#x4E57;&#x4EE3;&#x5165;</td>
      <td style="text-align:left">&#x5DE6;&#x306E;&#x5909;&#x6570;&#x306E;&#x5024;&#x3092;&#x53F3;&#x306E;&#x5024;&#x3067;&#x3079;&#x304D;&#x4E57;&#x3057;&#x305F;&#x7D50;&#x679C;&#x3092;&#x5DE6;&#x306E;&#x5909;&#x6570;&#x306B;
        <br
        />&#x5272;&#x308A;&#x5F53;&#x3066;&#x307E;&#x3059;&#x3002;</td>
    </tr>
    <tr>
      <td style="text-align:left">/=</td>
      <td style="text-align:left">&#x9664;&#x7B97;&#x4EE3;&#x5165;</td>
      <td style="text-align:left">&#x5DE6;&#x306E;&#x5909;&#x6570;&#x306E;&#x5024;&#x3092;&#x53F3;&#x306E;&#x5024;&#x3067;&#x5272;&#x308A;&#x7B97;&#x3057;&#x305F;&#x7D50;&#x679C;&#x3092;&#x5DE6;&#x306E;&#x5909;&#x6570;&#x306B;
        <br
        />&#x5272;&#x308A;&#x5F53;&#x3066;&#x307E;&#x3059;&#x3002;</td>
    </tr>
    <tr>
      <td style="text-align:left">%=</td>
      <td style="text-align:left">&#x5270;&#x4F59;&#x4EE3;&#x5165;</td>
      <td style="text-align:left">&#x5DE6;&#x306E;&#x5909;&#x6570;&#x306E;&#x5024;&#x306B;&#x53F3;&#x306E;&#x5024;&#x3067;&#x5272;&#x308A;&#x7B97;&#x3057;&#x305F;&#x4F59;&#x308A;&#x3092;&#x5DE6;&#x306E;&#x5909;&#x6570;&#x306B;
        <br
        />&#x5272;&#x308A;&#x5F53;&#x3066;&#x307E;&#x3059;&#x3002;</td>
    </tr>
    <tr>
      <td style="text-align:left">+=</td>
      <td style="text-align:left">&#x52A0;&#x7B97;&#x4EE3;&#x5165;</td>
      <td style="text-align:left">&#x5DE6;&#x306E;&#x5909;&#x6570;&#x306E;&#x5024;&#x3068;&#x306B;&#x53F3;&#x306E;&#x5024;&#x3092;&#x8DB3;&#x3057;&#x7B97;&#x3057;&#x305F;&#x7D50;&#x679C;&#x3092;&#x5DE6;&#x306E;&#x5909;&#x6570;&#x306B;
        <br
        />&#x5272;&#x308A;&#x5F53;&#x3066;&#x307E;&#x3059;&#x3002;</td>
    </tr>
    <tr>
      <td style="text-align:left">-=</td>
      <td style="text-align:left">&#x6E1B;&#x7B97;&#x4EE3;&#x5165;</td>
      <td style="text-align:left">&#x5DE6;&#x306E;&#x5909;&#x6570;&#x306E;&#x5024;&#x304B;&#x3089;&#x53F3;&#x306E;&#x5024;&#x3092;&#x5F15;&#x304D;&#x7B97;&#x3057;&#x305F;&#x7D50;&#x679C;&#x3092;&#x5DE6;&#x306E;&#x5909;&#x6570;&#x306B;
        <br
        />&#x5272;&#x308A;&#x5F53;&#x3066;&#x307E;&#x3059;&#x3002;</td>
    </tr>
    <tr>
      <td style="text-align:left">&lt;&lt;=</td>
      <td style="text-align:left">&#x5DE6;&#x30B7;&#x30D5;&#x30C8;&#x4EE3;&#x5165;</td>
      <td style="text-align:left">
        <p>&#x5DE6;&#x306E;&#x5909;&#x6570;&#x306E;&#x5024;&#x306E;&#x30D3;&#x30C3;&#x30C8;&#x3092;&#x53F3;&#x306E;&#x5024;&#x306E;&#x6570;&#x3060;&#x3051;&#x5DE6;&#x306B;&#x305A;&#x3089;&#x3057;&#x305F;&#x7D50;&#x679C;&#x3092;
          <br
          />&#x5DE6;&#x306E;&#x5909;&#x6570;&#x306B;&#x5272;&#x308A;&#x5F53;&#x3066;&#x307E;&#x3059;&#x3002;</p>
        <p></p>
        <p>&#x4F8B;:</p>
        <p>let a = 1 // 00000001</p>
        <p>const b = 3
          <br />a &lt;&lt;= b</p>
        <p>console.log(a) // 00001000</p>
        <p>// &#x51FA;&#x529B;: 1</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">&gt;&gt;=</td>
      <td style="text-align:left">&#x53F3;&#x30B7;&#x30D5;&#x30C8;&#x4EE3;&#x5165;</td>
      <td style="text-align:left">&#x5DE6;&#x306E;&#x5909;&#x6570;&#x306E;&#x5024;&#x306E;&#x30D3;&#x30C3;&#x30C8;&#x3092;&#x53F3;&#x306E;&#x5024;&#x306E;&#x6570;&#x3060;&#x3051;&#x53F3;&#x306B;&#x305A;&#x3089;&#x3057;&#x305F;&#x7D50;&#x679C;&#x3092;
        <br
        />&#x5DE6;&#x306E;&#x5909;&#x6570;&#x306B;&#x5272;&#x308A;&#x5F53;&#x3066;&#x307E;&#x3059;&#x3002;</td>
    </tr>
    <tr>
      <td style="text-align:left">&gt;&gt;&gt;=</td>
      <td style="text-align:left">&#x7B26;&#x53F7;&#x306A;&#x3057;&#x53F3;&#x30B7;&#x30D5;&#x30C8;&#x4EE3;&#x5165;</td>
      <td
      style="text-align:left">
        <p>&#x5DE6;&#x306E;&#x5909;&#x6570;&#x306E;&#x5024;&#x306E;&#x30D3;&#x30C3;&#x30C8;&#x3092;&#x53F3;&#x306E;&#x5024;&#x306E;&#x6570;&#x3060;&#x3051;&#x53F3;&#x306B;&#x305A;&#x3089;&#x3057;&#x305F;&#x7D50;&#x679C;&#x3092;
          <br
          />&#x5DE6;&#x306E;&#x5909;&#x6570;&#x306B;&#x5272;&#x308A;&#x5F53;&#x3066;&#x307E;&#x3059;&#x3002;</p>
        <p>&#x5DE6;&#x306B;&#x5165;&#x308B;&#x7B26;&#x53F7;&#x30D3;&#x30C3;&#x30C8;&#x306F;&#x5E38;&#x306B;
          0 &#x306B;&#x306A;&#x308A;&#x307E;&#x3059;&#x3002;</p>
        </td>
    </tr>
    <tr>
      <td style="text-align:left">&amp;=</td>
      <td style="text-align:left">&#x30D3;&#x30C3;&#x30C8;&#x8AD6;&#x7406;&#x7A4D;&#x4EE3;&#x5165;</td>
      <td
      style="text-align:left">
        <p>&#x5DE6;&#x306E;&#x5909;&#x6570;&#x306E;&#x5024;&#x3068;&#x53F3;&#x306E;&#x5024;&#x3067;&#x5171;&#x306B;&#x30D3;&#x30C3;&#x30C8;&#x304C;1&#x3067;&#x3042;&#x308B;&#x4F4D;&#x7F6E;&#x306E;&#x30D3;&#x30C3;&#x30C8;&#x3092;
          <br
          />1&#x306B;&#x3057;&#x305F;&#x7D50;&#x679C;&#x3092;&#x5DE6;&#x306E;&#x5909;&#x6570;&#x306B;&#x5272;&#x308A;&#x5F53;&#x3066;&#x307E;&#x3059;&#x3002;</p>
        <p>
          <br />&#x4F8B;:</p>
        <p>let a = 1 // 00000001</p>
        <p>const b = 5 // 00000101
          <br />a &amp;= b</p>
        <p>console.log(a) // 00000001</p>
        <p>// &#x51FA;&#x529B;: 1</p>
        </td>
    </tr>
    <tr>
      <td style="text-align:left">|=</td>
      <td style="text-align:left">&#x30D3;&#x30C3;&#x30C8;&#x8AD6;&#x7406;&#x548C;&#x4EE3;&#x5165;</td>
      <td
      style="text-align:left">&#x5DE6;&#x306E;&#x5909;&#x6570;&#x306E;&#x5024;&#x3068;&#x53F3;&#x306E;&#x5024;&#x3067;&#x3069;&#x3061;&#x3089;&#x304B;&#x304C;&#x306E;&#x30D3;&#x30C3;&#x30C8;&#x304C;1&#x3067;&#x3042;&#x308B;&#x4F4D;&#x7F6E;&#x306E;
        <br
        />&#x30D3;&#x30C3;&#x30C8;&#x3092;1&#x306B;&#x3057;&#x305F;&#x7D50;&#x679C;&#x3092;&#x5DE6;&#x306E;&#x5909;&#x6570;&#x306B;&#x5272;&#x308A;&#x5F53;&#x3066;&#x307E;&#x3059;&#x3002;</td>
    </tr>
    <tr>
      <td style="text-align:left">^=</td>
      <td style="text-align:left">&#x30D3;&#x30C3;&#x30C8;&#x6392;&#x4ED6;&#x7684;&#x8AD6;&#x7406;&#x548C;&#x4EE3;&#x5165;</td>
      <td
      style="text-align:left">&#x5DE6;&#x306E;&#x5909;&#x6570;&#x306E;&#x5024;&#x3068;&#x53F3;&#x306E;&#x5024;&#x3067;&#x30D3;&#x30C3;&#x30C8;&#x306E;&#x5024;&#x304C;&#x7570;&#x306A;&#x308B;&#x4F4D;&#x7F6E;&#x306E;&#x30D3;&#x30C3;&#x30C8;&#x3092;
        <br
        />1&#x306B;&#x3057;&#x305F;&#x7D50;&#x679C;&#x3092;&#x5DE6;&#x306E;&#x5909;&#x6570;&#x306B;&#x5272;&#x308A;&#x5F53;&#x3066;&#x307E;&#x3059;&#x3002;</td>
    </tr>
    <tr>
      <td style="text-align:left">&amp;&amp;=</td>
      <td style="text-align:left">&#x8AD6;&#x7406;&#x7A4D;&#x4EE3;&#x5165;</td>
      <td style="text-align:left">
        <p>&#x5DE6;&#x306E;&#x5909;&#x6570;&#x306E;&#x771F;&#x507D;&#x5024;&#x3068;&#x53F3;&#x306E;&#x771F;&#x507D;&#x5024;&#x306E;&#x8AD6;&#x7406;&#x7A4D;&#x306E;&#x7D50;&#x679C;&#x3092;&#x5DE6;&#x306E;&#x5909;&#x6570;&#x306B;
          <br
          />&#x5272;&#x308A;&#x5F53;&#x3066;&#x307E;&#x3059;&#x3002;</p>
        <p></p>
        <p>&#x4F8B;:</p>
        <p>let a = true</p>
        <p>let b = false</p>
        <p>a &amp;&amp;= b</p>
        <p>console.log(a) // false</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">||=</td>
      <td style="text-align:left">&#x8AD6;&#x7406;&#x548C;&#x4EE3;&#x5165;</td>
      <td style="text-align:left">
        <p>&#x5DE6;&#x306E;&#x5909;&#x6570;&#x306E;&#x771F;&#x507D;&#x5024;&#x3068;&#x53F3;&#x306E;&#x771F;&#x507D;&#x5024;&#x306E;&#x8AD6;&#x7406;&#x548C;&#x306E;&#x7D50;&#x679C;&#x3092;&#x5DE6;&#x306E;&#x5909;&#x6570;&#x306B;</p>
        <p>&#x5272;&#x308A;&#x5F53;&#x3066;&#x307E;&#x3059;&#x3002;</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">??=</td>
      <td style="text-align:left">Null&#x5408;&#x4F53;&#x4EE3;&#x5165;</td>
      <td style="text-align:left">
        <p>&#x5DE6;&#x306E;&#x5909;&#x6570;&#x306E;&#x5024;&#x304C; null &#x307E;&#x305F;&#x306F;
          undefined &#x306E;&#x5834;&#x5408;&#x306E;&#x307F;&#x53F3;&#x306E;&#x5024;&#x3092;
          <br
          />&#x5DE6;&#x306E;&#x5909;&#x6570;&#x306B;&#x5272;&#x308A;&#x5F53;&#x3066;&#x307E;&#x3059;&#x3002;</p>
        <p></p>
        <p>&#x4F8B;:
          <br />const user1 = { name: undefined }
          <br />user1.name ??= &apos;taro&apos;
          <br />console.log(user1.name) // taro
          <br />
          <br />const user2 = { name: &apos;kaori&apos;}
          <br />user2.name ??= &apos;taro&apos;
          <br />console.log(user2.name) // kaori</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">,</td>
      <td style="text-align:left">&#x30AB;&#x30F3;&#x30DE;&#x6F14;&#x7B97;&#x5B50;</td>
      <td style="text-align:left">
        <p>&#x5DE6;&#x304B;&#x3089;&#x53F3;&#x306B;&#x5F0F;&#x3092;&#x8A55;&#x4FA1;&#x3092;&#x3057;&#x3066;&#x3001;&#x4E00;&#x756A;&#x53F3;&#x306E;&#x8A55;&#x4FA1;&#x3057;&#x305F;&#x5024;&#x3092;&#x8FD4;&#x3057;&#x307E;&#x3059;&#x3002;</p>
        <p></p>
        <p>&#x4F8B;:
          <br />let x = -1</p>
        <p>const a = x++, x++, x &gt; 0</p>
        <p>console.log(a) // true</p>
      </td>
    </tr>
  </tbody>
</table>

### TypeScript由来の記号

（後でけす）

（TypeScriptのHandbookを眺めて記号を洗い出す）

<table>
  <thead>
    <tr>
      <th style="text-align:left">&#x8A18;&#x53F7;</th>
      <th style="text-align:left">&#x540D;&#x79F0;</th>
      <th style="text-align:left">&#x8AAC;&#x660E;</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">?</td>
      <td style="text-align:left">&#x30AA;&#x30D7;&#x30B7;&#x30E7;&#x30F3;&#x4FEE;&#x98FE;&#x5B50;</td>
      <td
      style="text-align:left">
        <p>&#x30AA;&#x30D6;&#x30B8;&#x30A7;&#x30AF;&#x30C8;&#x306E;&#x30D7;&#x30ED;&#x30D1;&#x30C6;&#x30A3;&#x3092;&#x4EFB;&#x610F;&#x30D7;&#x30ED;&#x30D1;&#x30C6;&#x30A3;&#x3068;&#x3057;&#x3066;&#x5B9A;&#x7FA9;&#x3057;&#x307E;&#x3059;&#x3002;</p>
        <p></p>
        <p>&#x4F8B;:</p>
        <p>interface User {</p>
        <p>name: string; // name &#x306F;&#x5FC5;&#x9808;</p>
        <p>age?: number; // age &#x306F;&#x4EFB;&#x610F;</p>
        <p>}</p>
        <p>const user: User = { name: &apos;taro&apos; }</p>
        </td>
    </tr>
    <tr>
      <td style="text-align:left">!</td>
      <td style="text-align:left">&#x975E;Null&#x30A2;&#x30B5;&#x30FC;&#x30B7;&#x30E7;&#x30F3;</td>
      <td style="text-align:left">
        <p>&#x5024;&#x304C; <code>null</code> or <code>undefined</code> &#x3067;&#x306A;&#x3044;&#x3053;&#x3068;&#x3092;&#x5BA3;&#x8A00;&#x3057;&#x3001;
          <br
          />&#x30B3;&#x30F3;&#x30D1;&#x30A4;&#x30E9;&#x30FC;&#x306B;&#x5024;&#x3092;&#x975E;Null&#x3068;&#x3057;&#x3066;&#x89E3;&#x91C8;&#x3055;&#x305B;&#x307E;&#x3059;&#x3002;</p>
        <p>
          <br />&#x4F8B;:</p>
        <p>function firstChar(text: string | undefined) {
          <br />// &#x30B3;&#x30F3;&#x30D1;&#x30A4;&#x30EB;&#x30A8;&#x30E9;&#x30FC;&#x306B;&#x306A;&#x3089;&#x306A;&#x3044;
          <br
          />return text!.charAt(0);</p>
        <p>}</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">&amp;</td>
      <td style="text-align:left">&#x30A4;&#x30F3;&#x30BF;&#x30FC;&#x30BB;&#x30AF;&#x30B7;&#x30E7;&#x30F3;&#x578B;</td>
      <td
      style="text-align:left">
        <p>&#x8907;&#x6570;&#x306E;&#x578B;&#x3092;&#x7D44;&#x307F;&#x5408;&#x308F;&#x305B;&#x305F;&#x30A4;&#x30F3;&#x30BF;&#x30FC;&#x30BB;&#x30AF;&#x30B7;&#x30E7;&#x30F3;&#x578B;&#x3092;&#x5B9A;&#x7FA9;&#x3059;&#x308B;&#x3002;</p>
        <p></p>
        <p>&#x4F8B;:</p>
        <p>interface Swordsman {</p>
        <p>sword: string;</p>
        <p>}</p>
        <p></p>
        <p>interface Wizard {</p>
        <p>magic: string;</p>
        <p>}</p>
        <p></p>
        <p>type MagicalSwordsman = Swordsman &amp; Wizard;</p>
        </td>
    </tr>
    <tr>
      <td style="text-align:left">|</td>
      <td style="text-align:left">&#x30E6;&#x30CB;&#x30AA;&#x30F3;&#x578B;</td>
      <td style="text-align:left">
        <p>&#x8907;&#x6570;&#x306E;&#x578B;&#x3092;&#x7D44;&#x307F;&#x5408;&#x308F;&#x305B;&#x305F;&#x30E6;&#x30CB;&#x30AA;&#x30F3;&#x578B;&#x3092;&#x5B9A;&#x7FA9;&#x3059;&#x308B;&#x3002;</p>
        <p></p>
        <p>&#x4F8B;:</p>
        <p>type ID = string | number</p>
        <p>const id1 = &apos;e29b41&apos; // OK</p>
        <p>const id2 = 100 // OK</p>
        <p>const id3 = true // ERROR</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">+</td>
      <td style="text-align:left">&#x4FEE;&#x98FE;&#x5B50;&#x306E;&#x4ED8;&#x52A0;</td>
      <td style="text-align:left">
        <p>readonly&#x3084; ? &#x306A;&#x3069;&#x306E;&#x4FEE;&#x98FE;&#x5B50;&#x3092;&#x8FFD;&#x52A0;&#x3059;&#x308B;&#x3002;</p>
        <p>&#x4F55;&#x3082;&#x6307;&#x5B9A;&#x3057;&#x306A;&#x3044;&#x5834;&#x5408;&#x306F;&#x6697;&#x9ED9;&#x7684;&#x306B; <code>+</code> &#x304C;&#x4ED8;&#x4E0E;&#x3055;&#x308C;&#x308B;&#x306E;&#x3067;
          <br
          /><code>+</code> &#x3092;&#x5B9F;&#x969B;&#x306B;&#x5229;&#x7528;&#x3059;&#x308B;&#x6A5F;&#x4F1A;&#x306F;&#x304A;&#x305D;&#x3089;&#x304F;&#x3042;&#x308A;&#x307E;&#x305B;&#x3093;&#x3002;
          <br
          />
        </p>
        <p>&#x4F8B;:</p>
        <p>type MyPartial&lt;T&gt; = {</p>
        <p>[k in keyof T]+?: T[k]</p>
        <p>}</p>
        <p></p>
        <p>type MyReadonly&lt;T&gt; = {</p>
        <p>+readonly [k in keyof T]: T[k]</p>
        <p>}</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">-</td>
      <td style="text-align:left">&#x4FEE;&#x98FE;&#x5B50;&#x306E;&#x524A;&#x9664;</td>
      <td style="text-align:left">
        <p>readonly &#x3084; ? &#x306A;&#x3069;&#x306E;&#x4FEE;&#x98FE;&#x5B50;&#x3092;&#x524A;&#x9664;&#x3059;&#x308B;&#x3002;
          <br
          />
        </p>
        <p>&#x4F8B;:</p>
        <p>type MyRequired&lt;T&gt; = {</p>
        <p>[k in keyof T]-?: T[k]</p>
        <p>}</p>
        <p></p>
        <p>type Writable&lt;T&gt; = {
          <br />-readonly [k in keyof T]: T[k]
          <br />}</p>
      </td>
    </tr>
  </tbody>
</table>

