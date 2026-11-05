import http from 'http';

const BASE_URL = 'http://127.0.0.1:5000/api';

const request = (method, path, body = null) => {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + path);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, body: parsed });
        } catch {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });

    req.on('error', (err) => reject(err));

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
};

const assert = (condition, message) => {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ ${message}`);
  }
};

const runTests = async () => {
  console.log('--- STARTING PROGRAM MANAGEMENT BACKEND API TESTS ---\n');

  // 1. Health check
  console.log('1. Testing Health Check...');
  const health = await request('GET', '/health');
  assert(health.status === 200, 'Health check returns 200');
  assert(health.body.success === true, 'Health check indicates success');

  // 2. Create Basket 1 (Pratibimb)
  console.log('\n2. Testing Basket Creation (Basket 1 - Pratibimb)...');
  const b1Res = await request('POST', '/baskets', {
    name: 'Pratibimb',
    slug: 'pratibimb',
    tagline: 'Inception Programs',
    description: 'Initiatives designed to trigger reflection and early awareness.',
    logo: { url: 'https://bjsindia.org/assets/pratibimb.svg', key: 'pratibimb-logo' },
    displayOrder: 1,
    status: 'active',
  });
  assert(b1Res.status === 201, 'Basket 1 created with status 201');
  assert(b1Res.body.success === true, 'Basket 1 response has success: true');
  assert(b1Res.body.data._id, 'Basket 1 has _id');
  const basket1Id = b1Res.body.data._id;

  // 3. Create Basket 2 (Pravah)
  console.log('\n3. Testing Basket Creation (Basket 2 - Pravah)...');
  const b2Res = await request('POST', '/baskets', {
    name: 'Pravah',
    slug: 'pravah',
    tagline: 'Infusion Programs',
    description: 'Continuous engagement and youth life-skills programs.',
    displayOrder: 2,
    status: 'active',
  });
  assert(b2Res.status === 201, 'Basket 2 created with status 201');
  const basket2Id = b2Res.body.data._id;

  // 4. Get All Baskets
  console.log('\n4. Testing Get All Baskets...');
  const allBaskets = await request('GET', '/baskets?sortBy=displayOrder&sortOrder=asc');
  assert(allBaskets.status === 200, 'Get all baskets returns 200');
  assert(allBaskets.body.data.length >= 2, 'Contains at least 2 baskets');

  // Search baskets
  const searchBaskets = await request('GET', '/baskets?search=Pratibimb');
  assert(searchBaskets.body.data.some((b) => b.name === 'Pratibimb'), 'Search basket by name works');

  // 5. Get Basket by ID
  console.log('\n5. Testing Get Basket by ID...');
  const singleBasket = await request('GET', `/baskets/${basket1Id}`);
  assert(singleBasket.status === 200, 'Get basket by ID returns 200');
  assert(singleBasket.body.data.name === 'Pratibimb', 'Basket name matches');

  // 6. Update Basket
  console.log('\n6. Testing Update Basket...');
  const updatedBasket = await request('PUT', `/baskets/${basket1Id}`, {
    tagline: 'Updated Inception Programs Tagline',
  });
  assert(updatedBasket.status === 200, 'Update basket returns 200');
  assert(updatedBasket.body.data.tagline === 'Updated Inception Programs Tagline', 'Basket tagline updated');

  // 7. Create Programs under Basket 1
  console.log('\n7. Testing Program Creation under Basket 1...');
  const p1Res = await request('POST', '/programs', {
    basketId: basket1Id,
    name: 'Smart Girl',
    slug: 'smart-girl',
    shortDescription: 'Life skills and empowerment for adolescent girls',
    description: 'An experiential workshop empowering young girls with self-awareness and emotional strength.',
    thumbnail: { url: 'https://bjsindia.org/assets/smart-girl.png', key: 'smart-girl-key' },
    displayOrder: 1,
    status: 'active',
  });
  assert(p1Res.status === 201, 'Program 1 created with status 201');
  assert(p1Res.body.data.basketId === basket1Id, 'Program 1 references Basket 1');
  const program1Id = p1Res.body.data._id;

  const p2Res = await request('POST', '/programs', {
    basketId: basket1Id,
    name: 'Vidya Daan',
    slug: 'vidya-daan',
    shortDescription: 'Sharing knowledge and educational support',
    displayOrder: 2,
    status: 'active',
  });
  assert(p2Res.status === 201, 'Program 2 created with status 201');
  const program2Id = p2Res.body.data._id;

  // 8. Get Programs by Basket ID (/api/baskets/:basketId/programs)
  console.log('\n8. Testing Get Programs by Basket ID...');
  const basketPrograms = await request('GET', `/baskets/${basket1Id}/programs`);
  assert(basketPrograms.status === 200, 'Get programs by basket returns 200');
  assert(basketPrograms.body.data.length === 2, 'Basket 1 has exactly 2 programs');

  // 9. Get Program by ID
  console.log('\n9. Testing Get Program by ID...');
  const singleProgram = await request('GET', `/programs/${program1Id}`);
  assert(singleProgram.status === 200, 'Get program by ID returns 200');
  assert(singleProgram.body.data.name === 'Smart Girl', 'Program name matches');
  assert(singleProgram.body.data.basketId._id === basket1Id, 'Populated basketId matches');

  // 10. Update Program
  console.log('\n10. Testing Update Program...');
  const updatedProgram = await request('PUT', `/programs/${program1Id}`, {
    shortDescription: 'Updated: Life skills for girls aged 13-18',
  });
  assert(updatedProgram.status === 200, 'Update program returns 200');
  assert(updatedProgram.body.data.shortDescription === 'Updated: Life skills for girls aged 13-18', 'Short description updated');

  // 11. Create Program Content
  console.log('\n11. Testing Program Content Creation...');
  const contentRes = await request('POST', '/program-contents', {
    programId: program1Id,
    overview: 'Smart Girl equips adolescent girls with self-esteem and decision making skills.',
    objectives: [
      'Foster self-worth and confidence',
      'Develop emotional intelligence and boundary setting',
    ],
    targetAudience: ['Adolescent girls aged 13-18', 'Parents and educators'],
    duration: '2 Days (16 hours)',
    modules: [
      {
        title: 'Module 1: Self-Awareness',
        description: 'Discovering strengths and identity.',
        displayOrder: 1,
        topics: ['Identity', 'Self-esteem', 'Body Image'],
      },
      {
        title: 'Module 2: Communication',
        description: 'Constructive dialogue and interpersonal skills.',
        displayOrder: 2,
        topics: ['Effective Communication', 'Saying No Assertively'],
      },
    ],
    resources: [
      {
        title: 'Participant Workbook',
        description: 'Comprehensive guided exercise book',
        type: 'document',
        url: 'https://bjsindia.org/resources/smart-girl-workbook.pdf',
      },
    ],
    additionalInformation: {
      masterTrainers: 120,
      nationalReach: 814831,
    },
    status: 'active',
  });
  assert(contentRes.status === 201, 'Program content created with status 201');
  assert(contentRes.body.data.programId === program1Id, 'Content belongs to Program 1');
  assert(contentRes.body.data.modules.length === 2, 'Content has 2 modules');

  // 12. Get Program Content by Program ID
  console.log('\n12. Testing Get Content by Program ID...');
  const getContent = await request('GET', `/program-contents/${program1Id}`);
  assert(getContent.status === 200, 'Get content by programId returns 200');
  assert(getContent.body.data.duration === '2 Days (16 hours)', 'Duration matches');
  assert(getContent.body.data.programId._id === program1Id, 'Populated programId matches');

  // 13. Update Program Content
  console.log('\n13. Testing Update Program Content...');
  const updatedContent = await request('PUT', `/program-contents/${program1Id}`, {
    duration: '3 Days (24 hours)',
  });
  assert(updatedContent.status === 200, 'Update program content returns 200');
  assert(updatedContent.body.data.duration === '3 Days (24 hours)', 'Duration updated');

  // 14. Move Program between Baskets (PATCH /api/programs/:id/move)
  console.log('\n14. Testing Move Program between Baskets...');
  const moveRes = await request('PATCH', `/programs/${program1Id}/move`, {
    basketId: basket2Id,
  });
  assert(moveRes.status === 200, 'Move program returns 200');
  assert(moveRes.body.data.basketId._id === basket2Id, 'Program basketId updated to Basket 2 (Pravah)');

  // Verify Basket 1 now has only 1 program, and Basket 2 now has Program 1
  const b1Programs = await request('GET', `/baskets/${basket1Id}/programs`);
  const b2Programs = await request('GET', `/baskets/${basket2Id}/programs`);
  assert(b1Programs.body.data.length === 1, 'Basket 1 now only has 1 program remaining');
  assert(b2Programs.body.data.length === 1, 'Basket 2 now contains the moved program');
  assert(b2Programs.body.data[0]._id === program1Id, 'Basket 2 contains Smart Girl');

  // 15. Delete Program Content (Soft Delete)
  console.log('\n15. Testing Delete Program Content...');
  const delContent = await request('DELETE', `/program-contents/${program1Id}`);
  assert(delContent.status === 200, 'Delete program content returns 200');
  const getDeletedContent = await request('GET', `/program-contents/${program1Id}`);
  assert(getDeletedContent.status === 404, 'Deleted content returns 404 on subsequent get');

  // 16. Delete Program (Soft Delete)
  console.log('\n16. Testing Delete Program...');
  const delProgram = await request('DELETE', `/programs/${program1Id}`);
  assert(delProgram.status === 200, 'Delete program returns 200');
  const getDeletedProgram = await request('GET', `/programs/${program1Id}`);
  assert(getDeletedProgram.status === 404, 'Deleted program returns 404 on subsequent get');

  // 17. Delete Basket (Soft Delete with cascade)
  console.log('\n17. Testing Delete Basket...');
  const delBasket = await request('DELETE', `/baskets/${basket1Id}`);
  assert(delBasket.status === 200, 'Delete basket returns 200');
  const getDeletedBasket = await request('GET', `/baskets/${basket1Id}`);
  assert(getDeletedBasket.status === 404, 'Deleted basket returns 404 on subsequent get');

  // Program 2 (under Basket 1) should also be soft-deleted by cascade
  const getProgram2 = await request('GET', `/programs/${program2Id}`);
  assert(getProgram2.status === 404, 'Child program under deleted basket is also soft-deleted');

  console.log('\n🎉 ALL 17 TEST SUITES PASSED FLAWLESSLY!');
};

runTests().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});

